from datetime import datetime
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database.database import Base

class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    activity_type = Column(String(50), nullable=False, index=True)

    description = Column(String(255), nullable=False)

    source_ip = Column(String(45), nullable=True)

    device_name = Column(String(100), nullable=True)

    file_name = Column(String(255), nullable=True)

    process_name = Column(String(100), nullable=True)

    severity = Column(String(20), default="Low", index=True)
    risk_score = Column(Integer, default=0, index=True)
    status = Column(String(20), default="Success", index=True)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        index=True
    )

    user = relationship(
        "User",
        back_populates="activities"
    )