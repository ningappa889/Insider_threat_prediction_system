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

        for activity in activities:
            activity.severity = SeverityService.from_risk_score(
                activity.risk_score
            )

        for alert in alerts:
            alert.severity = SeverityService.from_risk_score(
                alert.risk_score
            )

        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()
