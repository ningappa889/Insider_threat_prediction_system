from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.database import get_db
from app.models.user import User
from app.schemas.activity import ActivityCreate, ActivityResponse
from app.services.activity_service import ActivityService

router = APIRouter(
    prefix="/activities",
    tags=["Activities"]
)


@router.post("/", response_model=ActivityResponse)
def create_activity(
    activity: ActivityCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return ActivityService.create_activity(
        db,
        current_user,
        activity
    )


@router.get("/", response_model=list[ActivityResponse])
def get_all_activities(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return ActivityService.get_all_activities(db)


@router.get("/{activity_id}", response_model=ActivityResponse)
def get_activity(
    activity_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    activity = ActivityService.get_activity_by_id(
        db,
        activity_id
    )

    if activity is None:
        raise HTTPException(
            status_code=404,
            detail="Activity not found."
        )

    return activity