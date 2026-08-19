from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.database import get_db
from app.models.user import User
from app.schemas.alert import AlertResponse
from app.services.alert_service import AlertService

router = APIRouter(
    prefix="/alerts",
    tags=["Alerts"]
)


@router.get("/", response_model=list[AlertResponse])
def get_alerts(
    limit: int = 100,
    skip: int = 0,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return AlertService.get_all_alerts(db, limit=limit, skip=skip)


@router.get("/{alert_id}", response_model=AlertResponse)
def get_alert(
    alert_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    alert = AlertService.get_alert_by_id(
        db,
        alert_id
    )

    if alert is None:
        raise HTTPException(
            status_code=404,
            detail="Alert not found."
        )

    return alert