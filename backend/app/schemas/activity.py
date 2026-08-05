from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ActivityBase(BaseModel):
    activity_type: str
    description: str
    source_ip: Optional[str] = None
    device_name: Optional[str] = None
    file_name: Optional[str] = None
    process_name: Optional[str] = None
    severity: str = "Low"
    status: str = "Success"


class ActivityCreate(ActivityBase):
    risk_score: int = 0


class ActivityResponse(ActivityBase):
    id: int
    user_id: int
    risk_score: int
    created_at: datetime

    class Config:
        from_attributes = True