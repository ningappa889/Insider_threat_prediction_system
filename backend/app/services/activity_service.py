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
    def get_all_activities(
        db: Session,
        activity_type: str = None,
        severity: str = None,
        status: str = None
    ):
        query = db.query(Activity)

        if activity_type:
            query = query.filter(
                Activity.activity_type == activity_type
            )

        if severity:
            query = query.filter(
                Activity.severity == severity
            )

        if status:
            query = query.filter(
                Activity.status == status
            )

        return query.all()

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

    @staticmethod
    def get_activity_statistics(db: Session):

        total_users = db.query(User).count()

        total_activities = db.query(Activity).count()

        successful_logins = (
            db.query(Activity)
            .filter(
                Activity.activity_type == "LOGIN",
                Activity.status == "Success"
            )
            .count()
        )

        failed_logins = (
            db.query(Activity)
            .filter(
                Activity.activity_type == "LOGIN",
                Activity.status == "Failed"
            )
            .count()
        )

        high_severity_events = (
            db.query(Activity)
            .filter(
                Activity.severity.in_(["High", "Critical"])
            )
            .count()
        )

        return {
            "total_users": total_users,
            "total_activities": total_activities,
            "successful_logins": successful_logins,
            "failed_logins": failed_logins,
            "high_severity_events": high_severity_events
        }