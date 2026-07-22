import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Toolbar,
} from "@mui/material";

import Sidebar from "../components/Sidebar";
import RiskTrendChart from "../components/RiskTrendChart";
import api from "../services/api";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total_users: 0,
    total_activities: 0,
    total_alerts: 0,
    high_risk_users: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await api.get("/stats/");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const StatCard = ({ title, value }) => (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        textAlign: "center",
      }}
    >
      <Typography color="text.secondary">
        {title}
      </Typography>

      <Typography
        variant="h3"
        fontWeight="bold"
        mt={2}
      >
        {value}
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
          background: "#f5f7fb",
          minHeight: "100vh",
        }}
      >
        <Toolbar />

        <Typography
          variant="h4"
          fontWeight="bold"
          mb={4}
        >
          Insider Threat Prediction Dashboard
        </Typography>

        {/* Statistics */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(200px,1fr))",
            gap: 3,
            mb: 3,
          }}
        >
          <StatCard
            title="Total Users"
            value={stats.total_users}
          />

          <StatCard
            title="Activities"
            value={stats.total_activities}
          />

          <StatCard
            title="Alerts"
            value={stats.total_alerts}
          />

          <StatCard
            title="High Risk Users"
            value={stats.high_risk_users}
          />
        </Box>

        {/* Middle Section */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 3,
            mb: 3,

            "@media (max-width:900px)": {
              gridTemplateColumns: "1fr",
            },
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h6"
              mb={2}
            >
              Risk Trend
            </Typography>

            <RiskTrendChart />
          </Paper>

          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h6"
              mb={2}
            >
              Recent Alerts
            </Typography>

            <Typography color="text.secondary">
              Live alerts will appear here.
            </Typography>
          </Paper>
        </Box>

        {/* Bottom */}

        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h6"
            mb={2}
          >
            Recent Activities
          </Typography>

          <Typography color="text.secondary">
            Live activities will appear here.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}