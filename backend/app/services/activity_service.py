from sqlalchemy.orm import Session

from app.models.activity import Activity
from app.models.user import User
from app.schemas.activity import ActivityCreate
from app.services.alert_service import AlertService
from app.services.behavior_service import BehaviorService

class ActivityService:

    @staticmethod
    def calculate_risk(activity_type: str):
        risk_map = {
            "LOGIN": (5, "Low"),
            "LOGOUT": (2, "Low"),
            "FAILED_LOGIN": (25, "Medium"),
            "FILE_ACCESS": (20, "Medium"),
            "USB_INSERT": (35, "High"),
            "POWERSHELL": (45, "High"),
            "ADMIN_PRIVILEGE_CHANGE": (80, "Critical")
        }

        return risk_map.get(
            activity_type,
            (10, "Low")
        )

    @staticmethod
    def create_activity(
        db: Session,
        current_user: User,
        activity: ActivityCreate
    ):

        risk_score, severity = ActivityService.calculate_risk(
            activity.activity_type
        )

        new_activity = Activity(
            user_id=current_user.id,
            activity_type=activity.activity_type,
            description=activity.description,
            source_ip=activity.source_ip,
            device_name=activity.device_name,
            file_name=activity.file_name,
            process_name=activity.process_name,
            severity=severity,
            risk_score=risk_score,
            status=activity.status
        )

        db.add(new_activity)
        db.commit()
        db.refresh(new_activity)

        AlertService.create_alert_if_needed(
            db,
            new_activity
        )

        if BehaviorService.detect_brute_force(
            db,
            current_user.id
        ):
            AlertService.create_behavior_alert(
                db=db,
                user_id=current_user.id,
                alert_type="BRUTE_FORCE_ATTACK",
                severity="Critical",
                risk_score=90,
                description="Multiple failed login attempts detected within 10 minutes."
            )


        if BehaviorService.detect_usb_data_theft(
            db,
            current_user.id
        ):
            AlertService.create_behavior_alert(
                db=db,
                user_id=current_user.id,
                alert_type="POSSIBLE_DATA_EXFILTRATION",
                severity="Critical",
                risk_score=95,
                description="USB device insertion followed by file access detected."
            )

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