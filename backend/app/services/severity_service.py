"""Shared severity rules used by activities, predictions, and alerts."""


class SeverityService:
    """Keep the risk-score-to-severity mapping in one place."""

    @staticmethod
    def from_risk_score(risk_score: int) -> str:
        """Return the canonical severity for a risk score from 0 to 100."""
        score = int(risk_score or 0)

        if score >= 75:
            return "Critical"
        if score >= 50:
            return "High"
        if score >= 25:
            return "Medium"
        return "Low"
