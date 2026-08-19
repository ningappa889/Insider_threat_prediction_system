import os
import sys
from pathlib import Path

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


BACKEND_DIR = Path(__file__).resolve().parents[1] / "backend"
sys.path.insert(0, str(BACKEND_DIR))

# The application loads .env relative to its working directory.  Tests run
# from the repository root, so provide the same minimal settings explicitly.
os.environ.setdefault("APP_NAME", "test")
os.environ.setdefault("APP_VERSION", "1")
os.environ.setdefault("DEBUG", "false")
os.environ.setdefault("HOST", "127.0.0.1")
os.environ.setdefault("PORT", "8000")
os.environ.setdefault("SECRET_KEY", "test-secret")
os.environ.setdefault("ALGORITHM", "HS256")
os.environ.setdefault("ACCESS_TOKEN_EXPIRE_MINUTES", "30")
os.environ.setdefault("DATABASE_URL", "sqlite:///:memory:")

from app.services.alert_service import AlertService  # noqa: E402
from app.database.database import Base  # noqa: E402
from app.models import Activity, Alert, User  # noqa: E402
from app.schemas.activity import ActivityCreate  # noqa: E402
from app.services.activity_service import ActivityService  # noqa: E402
from app.services.severity_service import SeverityService  # noqa: E402


@pytest.mark.parametrize(
    ("risk_score", "expected"),
    [
        (0, "Low"),
        (24, "Low"),
        (25, "Medium"),
        (49, "Medium"),
        (50, "High"),
        (74, "High"),
        (75, "Critical"),
        (100, "Critical"),
    ],
)
def test_shared_severity_mapping(risk_score, expected):
    assert SeverityService.from_risk_score(risk_score) == expected
    assert AlertService.calculate_severity(risk_score) == expected


def test_activity_and_alert_share_severity_for_new_records():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(bind=engine)
    session = sessionmaker(bind=engine)()

    try:
        user = User(
            full_name="Test User",
            email="severity-test@example.com",
            password="not-a-real-password",
        )
        session.add(user)
        session.commit()

        activity = ActivityService.create_activity(
            session,
            user,
            ActivityCreate(
                activity_type="ADMIN_PRIVILEGE_CHANGE",
                description="test activity",
                risk_score=80,
                severity="Low",  # legacy client value; score is canonical
                status="Success",
            ),
        )
        alert = session.query(Alert).one()

        assert activity.severity == "Critical"
        assert alert.severity == "Critical"
        assert alert.risk_score == activity.risk_score
    finally:
        session.close()


def test_sync_existing_severities_repairs_legacy_rows(monkeypatch):
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(bind=engine)
    TestingSession = sessionmaker(bind=engine)

    from app.database import init_db

    monkeypatch.setattr(init_db, "SessionLocal", TestingSession)

    session = TestingSession()
    try:
        user = User(
            full_name="Legacy User",
            email="legacy@example.com",
            password="secret-password",
        )
        session.add(user)
        session.commit()

        # Insert legacy activity with mismatched severity
        legacy_act = Activity(
            user_id=user.id,
            activity_type="ADMIN_PRIVILEGE_CHANGE",
            description="legacy activity",
            severity="Medium",  # Incorrect for risk_score 80
            risk_score=80,
            status="Failed",
        )
        # Insert legacy alert with mismatched severity
        legacy_alert = Alert(
            user_id=user.id,
            alert_type="ADMIN_PRIVILEGE_CHANGE",
            severity="Low",  # Incorrect for risk_score 80
            risk_score=80,
            description="legacy alert",
        )
        session.add_all([legacy_act, legacy_alert])
        session.commit()

        # Run database sync
        init_db.sync_existing_severities()

        # Verify severities have been auto-repaired to "Critical"
        repaired_act = session.query(Activity).filter_by(id=legacy_act.id).one()
        repaired_alert = session.query(Alert).filter_by(id=legacy_alert.id).one()

        assert repaired_act.severity == "Critical"
        assert repaired_alert.severity == "Critical"
    finally:
        session.close()


def test_routine_activity_does_not_create_alert():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(bind=engine)
    session = sessionmaker(bind=engine)()

    try:
        user = User(
            full_name="Routine User",
            email="routine@example.com",
            password="test-password",
        )
        session.add(user)
        session.commit()

        # Routine file access with normal AI prediction
        activity = ActivityService.create_activity(
            session,
            user,
            ActivityCreate(
                activity_type="FILE_ACCESS",
                description="AI Prediction: Normal Activity",
                risk_score=20,
                severity="Low",
                status="Success",
            ),
        )

        assert activity.id is not None
        assert session.query(Alert).count() == 0
    finally:
        session.close()


def test_ai_threat_prediction_creates_alert():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(bind=engine)
    session = sessionmaker(bind=engine)()

    try:
        user = User(
            full_name="Threat User",
            email="threat@example.com",
            password="test-password",
        )
        session.add(user)
        session.commit()

        # AI Prediction flagged as Insider Threat
        activity = ActivityService.create_activity(
            session,
            user,
            ActivityCreate(
                activity_type="FILE_ACCESS",
                description="AI Prediction: Insider Threat",
                risk_score=35,
                severity="Medium",
                status="Success",
            ),
        )

        assert activity.id is not None
        assert session.query(Alert).count() == 1
        alert = session.query(Alert).one()
        assert alert.alert_type == "FILE_ACCESS"
    finally:
        session.close()


