from sqlalchemy.orm import Session

from app.models.activity import Activity
from app.models.user import User
from app.schemas.activity import ActivityCreate


class ActivityService:

    @staticmethod
    def create_activity(
        db: Session,
        current_user: User,
        activity: ActivityCreate
    ):

        new_activity = Activity(
            user_id=current_user.id,
            activity_type=activity.activity_type,
            description=activity.description,
            source_ip=activity.source_ip,
            device_name=activity.device_name,
            file_name=activity.file_name,
            process_name=activity.process_name,
            severity=activity.severity,
            status=activity.status
        )

        db.add(new_activity)
        db.commit()
        db.refresh(new_activity)

        return new_activity

    @staticmethod
    def get_all_activities(db: Session):
        return db.query(Activity).all()

    @staticmethod
    def get_activity_by_id(
        db: Session,
        activity_id: int
    ):
        return (
            db.query(Activity)
            .filter(Activity.id == activity_id)
            .first()
        )