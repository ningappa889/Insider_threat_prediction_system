from datetime import datetime, timedelta

from sqlalchemy.orm import Session

from app.models.alert import Alert
from app.models.activity import Activity
from app.services.severity_service import SeverityService


class AlertService:

    @staticmethod
    def calculate_severity(risk_score: int) -> str:
        # Keep this method for callers that already use AlertService, while
        # delegating to the single shared severity rule.
        return SeverityService.from_risk_score(risk_score)

    @staticmethod
    def create_alert_if_needed(
        db: Session,
        activity: Activity
    ):
        # Ignore very low-risk activities
        if activity.risk_score < 20:
            return None

        alert = Alert(
            user_id=activity.user_id,
            alert_type=activity.activity_type,
            severity=SeverityService.from_risk_score(activity.risk_score),
            risk_score=activity.risk_score,
            description=activity.description
        )

        db.add(alert)
        db.commit()
        db.refresh(alert)

        return alert

    @staticmethod
    def get_all_alerts(db: Session):
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

    @staticmethod
    def create_behavior_alert(
        db: Session,
        user_id: int,
        alert_type: str,
        severity: str,
        risk_score: int,
        description: str
    ):

        ten_minutes_ago = datetime.utcnow() - timedelta(minutes=10)

        existing_alert = (
            db.query(Alert)
            .filter(
                Alert.user_id == user_id,
                Alert.alert_type == alert_type,
                Alert.created_at >= ten_minutes_ago
            )
            .first()
        )

        if existing_alert:
            return existing_alert

        alert = Alert(
            user_id=user_id,
            alert_type=alert_type,
            # Behavior alerts follow the same score-based rule as activity
            # alerts; the old severity argument is retained for compatibility.
            severity=SeverityService.from_risk_score(risk_score),
            risk_score=risk_score,
            description=description
        )

        db.add(alert)
        db.commit()
        db.refresh(alert)

        return alert
