from datetime import datetime

from pydantic import BaseModel


class AlertResponse(BaseModel):
    id: int
    user_id: int
    alert_type: str
    severity: str
    risk_score: int
    description: str
    created_at: datetime

    class Config:
        from_attributes = True