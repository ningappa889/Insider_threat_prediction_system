from sqlalchemy.orm import Session

from app.models.alert import Alert
from app.models.activity import Activity


class AlertService:

    @staticmethod
    def create_alert_if_needed(
        db: Session,
        activity: Activity
    ):
        if activity.risk_score < 30:
            return None

        alert = Alert(
            user_id=activity.user_id,
            alert_type=activity.activity_type,
            severity=activity.severity,
            risk_score=activity.risk_score,
            description=activity.description
        )

        db.add(alert)
        db.commit()
        db.refresh(alert)

        return alert

    @staticmethod
    def get_all_alerts(
        db: Session
    ):
        return (
            db.query(Alert)
            .order_by(Alert.created_at.desc())
            .all()
        )

    @staticmethod
    def get_alert_by_id(
        db: Session,
        alert_id: int
    ):
        return (
            db.query(Alert)
            .filter(Alert.id == alert_id)
            .first()
        )