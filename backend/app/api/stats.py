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
        total_activities = db.query(func.count(Activity.id)).scalar() or 0
        total_alerts = db.query(func.count(Alert.id)).scalar() or 0

        high_risk_users = (
            db.query(func.count(func.distinct(Activity.user_id)))
            .filter(Activity.risk_score >= 70)
            .scalar() or 0
        )

        return {
            "total_users": total_users,
            "total_activities": total_activities,
            "total_alerts": total_alerts,
            "high_risk_users": high_risk_users,
        }

    finally:
        db.close()