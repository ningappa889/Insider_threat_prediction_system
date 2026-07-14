from pydantic import BaseModel


class DashboardSummary(BaseModel):
    total_users: int
    total_activities: int
    successful_logins: int
    failed_logins: int
    high_severity_events: int