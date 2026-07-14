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

    @staticmethod
    def detect_usb_data_theft(
        db: Session,
        user_id: int
    ):

        five_minutes_ago = datetime.utcnow() - timedelta(minutes=5)

        usb_insert = (
            db.query(Activity)
            .filter(
                Activity.user_id == user_id,
                Activity.activity_type == "USB_INSERT",
                Activity.created_at >= five_minutes_ago
            )
            .first()
        )

        file_access = (
            db.query(Activity)
            .filter(
                Activity.user_id == user_id,
                Activity.activity_type == "FILE_ACCESS",
                Activity.created_at >= five_minutes_ago
            )
            .first()
        )

        return (
            usb_insert is not None
            and file_access is not None
        )