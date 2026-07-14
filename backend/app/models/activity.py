from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.database import Base


class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    activity_type = Column(String(50), nullable=False)

    description = Column(String(255), nullable=False)

    source_ip = Column(String(45), nullable=True)

    device_name = Column(String(100), nullable=True)

    file_name = Column(String(255), nullable=True)

    process_name = Column(String(100), nullable=True)

    severity = Column(String(20), default="Low")
    risk_score = Column(Integer, default=0)
    status = Column(String(20), default="Success")

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    user = relationship(
        "User",
        back_populates="activities"
    )