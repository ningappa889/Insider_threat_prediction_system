from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from app.core.dependencies import get_current_user
from app.database.database import get_db
from app.models.user import User
from app.schemas.activity import ActivityCreate, ActivityResponse
from app.schemas.dashboard import DashboardSummary
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
@router.get("/stats", response_model=DashboardSummary)
def get_statistics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return ActivityService.get_activity_statistics(db)

@router.get("/", response_model=list[ActivityResponse])
def get_all_activities(
    activity_type: Optional[str] = None,
    severity: Optional[str] = None,
    status: Optional[str] = None,
    limit: int = 100,
    skip: int = 0,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return ActivityService.get_all_activities(
        db,
        activity_type,
        severity,
        status,
        limit,
        skip
    )

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