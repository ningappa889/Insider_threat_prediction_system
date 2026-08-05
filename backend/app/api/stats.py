from fastapi import APIRouter
from sqlalchemy import func

from app.database.database import SessionLocal
from app.models.user import User
from app.models.activity import Activity
from app.models.alert import Alert

router = APIRouter(
    prefix="/stats",
    tags=["Statistics"]
)


@router.get("/")
def get_dashboard_stats():
    db = SessionLocal()

    try:
        total_users = db.query(func.count(User.id)).scalar() or 0

        total_activities = (
            db.query(func.count(Activity.id)).scalar() or 0
        )

        total_alerts = (
            db.query(func.count(Alert.id)).scalar() or 0
        )

        high_risk_users = (
            db.query(func.count(func.distinct(Activity.user_id)))
            .filter(Activity.risk_score >= 70)
            .scalar() or 0
        )

        recent_alerts = (
            db.query(Alert)
            .order_by(Alert.created_at.desc())
            .limit(5)
            .all()
        )

        recent_activities = (
            db.query(Activity)
            .order_by(Activity.created_at.desc())
            .limit(5)
            .all()
        )

        return {
            "total_users": total_users,
            "total_activities": total_activities,
            "total_alerts": total_alerts,
            "high_risk_users": high_risk_users,

            "recent_alerts": [
                {
                    "alert_type": alert.alert_type,
                    "severity": alert.severity,
                    "created_at": alert.created_at,
                }
                for alert in recent_alerts
            ],

            "recent_activities": [
                {
                    "activity_type": activity.activity_type,
                    "risk_score": activity.risk_score,
                    "created_at": activity.created_at,
                }
                for activity in recent_activities
            ],
        }

    finally:
        db.close()