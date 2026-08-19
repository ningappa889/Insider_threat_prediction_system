import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Toolbar,
} from "@mui/material";

import Sidebar from "../components/Sidebar";
import RiskTrendChart from "../components/RiskTrendChart";
import AlertSeverityChart from "../components/AlertSeverityChart";
import TopActivityChart from "../components/TopActivityChart";
import api from "../services/api";
import { formatDate } from "../utils/dateFormatter";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Dashboard ErrorBoundary caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Paper elevation={2} sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
          <Typography color="text.secondary">
            Chart visualization temporarily unavailable.
          </Typography>
        </Paper>
      );
    }
    return this.props.children;
  }
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total_users: 0,
    total_activities: 0,
    total_alerts: 0,
    high_risk_users: 0,

    average_risk_score: 0,
    critical_alerts: 0,
    high_risk_activities: 0,

    severity_distribution: [],
    activity_trend: [],
    top_activity_types: [],

    recent_alerts: [],
    recent_activities: [],
  });

  useEffect(() => {
    loadStats();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const loadStats = async () => {
    try {
      const res = await api.get("/stats/");
      if (res && res.data) {
        setStats({
          total_users: res.data.total_users ?? 0,
          total_activities: res.data.total_activities ?? 0,
          total_alerts: res.data.total_alerts ?? 0,
          high_risk_users: res.data.high_risk_users ?? 0,
          average_risk_score: res.data.average_risk_score ?? 0,
          critical_alerts: res.data.critical_alerts ?? 0,
          high_risk_activities: res.data.high_risk_activities ?? 0,
          severity_distribution: Array.isArray(res.data.severity_distribution)
            ? res.data.severity_distribution
            : [],
          activity_trend: Array.isArray(res.data.activity_trend)
            ? res.data.activity_trend
            : [],
          top_activity_types: Array.isArray(res.data.top_activity_types)
            ? res.data.top_activity_types
            : [],
          recent_alerts: Array.isArray(res.data.recent_alerts)
            ? res.data.recent_alerts
            : [],
          recent_activities: Array.isArray(res.data.recent_activities)
            ? res.data.recent_activities
            : [],
        });
      }
    } catch (err) {
      console.error("Error loading dashboard stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value }) => (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        textAlign: "center",
      }}
    >
      <Typography color="text.secondary">{title}</Typography>
      <Typography variant="h3" fontWeight="bold" mt={2}>
        {value ?? 0}
      </Typography>
    </Paper>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          backgroundColor: "background.default",
          minHeight: "100vh",
        }}
      >
        <Toolbar />

        <Typography variant="h4" fontWeight="bold" mb={4}>
          Insider Threat Prediction Dashboard
        </Typography>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Statistics Cards */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
                gap: 3,
                mb: 3,
              }}
            >
              <StatCard title="Total Users" value={stats.total_users} />
              <StatCard title="Activities" value={stats.total_activities} />
              <StatCard title="Alerts" value={stats.total_alerts} />
              <StatCard title="High Risk Users" value={stats.high_risk_users} />
              <StatCard title="Avg Risk Score" value={stats.average_risk_score} />
              <StatCard title="Critical Alerts" value={stats.critical_alerts} />
              <StatCard title="High Risk Activities" value={stats.high_risk_activities} />
            </Box>

            {/* Charts & Recent Alerts */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr",
                gap: 3,
                mb: 3,
                "@media (max-width:1200px)": {
                  gridTemplateColumns: "1fr",
                },
              }}
            >
              {/* Risk Trend */}
              <Paper elevation={3} sx={{ p: 3, borderRadius: 3, minWidth: 0 }}>
                <Typography variant="h6" mb={2}>
                  Risk Trend
                </Typography>
                <ErrorBoundary>
                  <RiskTrendChart data={stats.activity_trend} />
                </ErrorBoundary>
              </Paper>

              {/* Alert Severity */}
              <Paper elevation={3} sx={{ p: 3, borderRadius: 3, minWidth: 0 }}>
                <Typography variant="h6" mb={2}>
                  Alert Severity
                </Typography>
                <ErrorBoundary>
                  <AlertSeverityChart data={stats.severity_distribution} />
                </ErrorBoundary>
              </Paper>

              {/* Recent Alerts */}
              <Paper elevation={3} sx={{ p: 3, borderRadius: 3, minWidth: 0 }}>
                <Typography variant="h6" mb={2}>
                  Recent Alerts
                </Typography>
                <ErrorBoundary>
                  {!stats.recent_alerts || stats.recent_alerts.length === 0 ? (
                    <Typography color="text.secondary">No alerts found.</Typography>
                  ) : (
                    (stats.recent_alerts || []).map((alert, index) => (
                      <Box
                        key={index}
                        sx={{
                          mb: 2,
                          pb: 1,
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        <Typography fontWeight="bold">{alert.alert_type}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {alert.severity}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(alert.created_at)}
                        </Typography>
                      </Box>
                    ))
                  )}
                </ErrorBoundary>
              </Paper>
            </Box>

            {/* Recent Activities */}
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
              <Typography variant="h6" mb={2}>
                Recent Activities
              </Typography>
              <ErrorBoundary>
                {!stats.recent_activities || stats.recent_activities.length === 0 ? (
                  <Typography color="text.secondary">No activities found.</Typography>
                ) : (
                  (stats.recent_activities || []).map((activity, index) => (
                    <Box
                      key={index}
                      sx={{
                        mb: 2,
                        pb: 1,
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <Typography fontWeight="bold">{activity.activity_type}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Risk Score: {activity.risk_score}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(activity.created_at)}
                      </Typography>
                    </Box>
                  ))
                )}
              </ErrorBoundary>
            </Paper>

            {/* Top Activity Types */}
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3, minWidth: 0 }}>
              <Typography variant="h6" mb={2}>
                Top Activity Types
              </Typography>
              <ErrorBoundary>
                <TopActivityChart data={stats.top_activity_types} />
              </ErrorBoundary>
            </Paper>
          </>
        )}
      </Box>
    </Box>
  );
}