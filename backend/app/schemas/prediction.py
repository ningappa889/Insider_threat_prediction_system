from pydantic import BaseModel


class PredictionRequest(BaseModel):
    activity_type: str
    risk_score: int
    severity: str
    status: str


class PredictionResponse(BaseModel):
    prediction: str
    confidence: float
    risk_level: str