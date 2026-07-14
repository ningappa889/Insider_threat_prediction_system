from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.database import get_db
from app.models.user import User
from app.schemas.prediction import (
    PredictionRequest,
    PredictionResponse,
)
from app.services.ml_service import MLService

router = APIRouter(
    prefix="/predict",
    tags=["Machine Learning"]
)


@router.post("/", response_model=PredictionResponse)
def predict(
    request: PredictionRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    result = MLService.predict(
        activity_type=request.activity_type,
        risk_score=request.risk_score,
        severity=request.severity,
        status=request.status
    )

    return result