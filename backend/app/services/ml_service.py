import os

import joblib
import pandas as pd
from app.services.severity_service import SeverityService


class MLService:

    model = None

    @staticmethod
    def load_model():

        if MLService.model is None:

            model_path = os.path.join(
                os.path.dirname(__file__),
                "..",
                "..",
                "ml",
                "models",
                "insider_threat_model.pkl"
            )

            model_path = os.path.abspath(model_path)

            MLService.model = joblib.load(model_path)

        return MLService.model

    @staticmethod
    def predict(
        activity_type: str,
        risk_score: int,
        severity: str,
        status: str
    ):

        model = MLService.load_model()

        sample = pd.DataFrame([
            {
                "activity_type": activity_type,
                "risk_score": risk_score,
                "severity": severity,
                "status": status
            }
        ])

        try:
            prediction = model.predict(sample)[0]
            probability = model.predict_proba(sample)[0]
            confidence = max(probability) * 100
        except Exception as e:
            # Fallback heuristic prediction if model pipeline encounters unknown category
            prediction = 1 if risk_score >= 50 or status == "Failed" else 0
            confidence = min(99.0, max(65.0, float(risk_score)))

        prediction_text = (
            "Insider Threat"
            if prediction == 1
            else "Normal Activity"
        )

        # Severity is a property of the event's risk score.  Keeping this
        # mapping shared with activities and alerts prevents one event from
        # receiving different severities in different sections of the app.
        risk_level = SeverityService.from_risk_score(risk_score)

        return {
            "prediction": prediction_text,
            "confidence": round(confidence, 2),
            "risk_level": risk_level
        }
