from app.database.database import Base, SessionLocal, engine

# Import all models here
from app.models import User, Activity, Alert
from app.services.severity_service import SeverityService

def init_db():
    Base.metadata.create_all(bind=engine)
    sync_existing_severities()


def sync_existing_severities():
    """Repair legacy rows so stored activities and alerts use one rule."""
    db = SessionLocal()

    try:
        activities = db.query(Activity).all()
        alerts = db.query(Alert).all()

        updated = False
        for activity in activities:
            expected = SeverityService.from_risk_score(activity.risk_score)
            if activity.severity != expected:
                activity.severity = expected
                updated = True

        for alert in alerts:
            expected = SeverityService.from_risk_score(alert.risk_score)
            if alert.severity != expected:
                alert.severity = expected
                updated = True

        if updated:
            db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()
