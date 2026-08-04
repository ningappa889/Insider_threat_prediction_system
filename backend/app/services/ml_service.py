import os

import joblib
import pandas as pd


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

        prediction = model.predict(sample)[0]
        probability = model.predict_proba(sample)[0]
        confidence = max(probability) * 100

        prediction_text = (
            "Insider Threat"
            if prediction == 1
            else "Normal Activity"
        )

# Determine risk level based on prediction and confidence
        if prediction == 0:
            # Model predicts normal activity
            risk_level = "Low"
        else:
            # Model predicts insider threat
            if confidence >= 90:
                risk_level = "Critical"
            elif confidence >= 70:
                risk_level = "High"
            elif confidence >= 50:
                risk_level = "Medium"
            else:
                risk_level = "Low"

        return {
            "prediction": prediction_text,
            "confidence": round(confidence, 2),
            "risk_level": risk_level
        }