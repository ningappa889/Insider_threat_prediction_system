from sqlalchemy import Boolean, Column, DateTime, Integer, String
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    email = Column(String(100), unique=True, index=True, nullable=False)

    password = Column(String(255), nullable=False)

    role = Column(String(30), nullable=False, default="Employee")

    department = Column(String(100), nullable=True)

    is_active = Column(Boolean, default=True)
    activities = relationship(
        "Activity",
        back_populates="user",
        cascade="all, delete-orphan"
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now())