from fastapi import FastAPI
from app.api.activities import router as activities_router
from app.api.users import router as users_router
from app.api.auth import router as auth_router
from app.core.config import settings
from app.database.init_db import init_db

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    debug=settings.DEBUG
)

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(activities_router)


@app.on_event("startup")
def startup():
    init_db()


@app.get("/")
def root():
    return {
        "message": f"Welcome to {settings.APP_NAME}",
        "version": settings.APP_VERSION,
        "status": "Running Successfully"
    }


@app.get("/health")
def health():
    return {
        "status": "Healthy"
    }