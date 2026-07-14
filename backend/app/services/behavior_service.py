from datetime import datetime, timedelta

from sqlalchemy.orm import Session

from app.models.activity import Activity


class BehaviorService:

    @staticmethod
    def detect_brute_force(
        db: Session,
        user_id: int
    ):

        ten_minutes_ago = datetime.utcnow() - timedelta(minutes=10)

        failed_logins = (
            db.query(Activity)
            .filter(
                Activity.user_id == user_id,
                Activity.activity_type == "FAILED_LOGIN",
                Activity.created_at >= ten_minutes_ago
            )
            .count()
        )

        return failed_logins >= 5