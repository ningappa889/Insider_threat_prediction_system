from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.activities import router as activities_router
from app.api.users import router as users_router
from app.api.auth import router as auth_router
from app.api.alerts import router as alerts_router
from app.api.predictions import router as prediction_router
from app.api.stats import router as stats_router
from app.core.config import settings
from app.database.init_db import init_db

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    debug=settings.DEBUG
)

# -------------------- CORS --------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://insider-threat-prediction-system.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ----------------------------------------------

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(activities_router)
app.include_router(alerts_router)
app.include_router(prediction_router)
app.include_router(stats_router)
app.include_router(prediction_router)
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