from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.models.user import User
from app.schemas.user import UserCreate


class AuthService:

    @staticmethod
    def get_user_by_email(db: Session, email: str):
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def create_user(db: Session, user: UserCreate):

        existing_user = AuthService.get_user_by_email(db, user.email)

        if existing_user:
            return None

        new_user = User(
            full_name=user.full_name,
            email=user.email,
            password=hash_password(user.password),
            department=user.department,
            role="Employee"
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return new_user

    @staticmethod
    def authenticate_user(
        db: Session,
        email: str,
        password: str
    ):
        user = AuthService.get_user_by_email(db, email)

        if not user:
            return None

        from app.core.security import verify_password

        if not verify_password(password, user.password):
            return None

        return user