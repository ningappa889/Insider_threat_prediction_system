from datetime import datetime
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database.database import Base

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    alert_type = Column(String(100), nullable=False, index=True)

    severity = Column(String(20), nullable=False, index=True)

    risk_score = Column(Integer, nullable=False, index=True)

    description = Column(String(255), nullable=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        index=True
    )

    user = relationship("User")