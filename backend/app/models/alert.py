from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from app.database.database import Base
from datetime import datetime
from zoneinfo import ZoneInfo

def indian_time():
    return datetime.now(ZoneInfo("Asia/Kolkata"))
class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    alert_type = Column(String(100), nullable=False)

    severity = Column(String(20), nullable=False)

    risk_score = Column(Integer, nullable=False)

    description = Column(String(255), nullable=False)

    created_at = Column(
        DateTime,
        default=indian_time
    )

    user = relationship("User")