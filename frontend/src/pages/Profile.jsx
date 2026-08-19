import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Toolbar,
  Typography,
} from "@mui/material";

import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { formatDate } from "../utils/dateFormatter";

export default function Profile() {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await api.get("/users/me");
      setUser(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };



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

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          My Profile
        </Typography>

        <Card
          sx={{
            maxWidth: 700,
            borderRadius: 3,
          }}
        >
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 5,
              }}
            >
              <CircularProgress />
            </Box>
          ) : user ? (
            <CardContent>

            <Box
              display="flex"
              alignItems="center"
              gap={3}
              mb={3}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  fontSize: 32,
                }}
              >
                {user?.full_name?.charAt(0)}
              </Avatar>

              <Box>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                >
                  {user.full_name}
                </Typography>

                <Typography color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Typography sx={{ mb: 2 }}>
              <b>Role:</b> {user.role}
            </Typography>

            <Typography sx={{ mb: 2 }}>
              <b>Department:</b>{" "}
              {user.department || "-"}
            </Typography>

            <Typography sx={{ mb: 2 }}>
              <b>Joined:</b>{" "}
              {formatDate(user.created_at)}
            </Typography>

            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <b>Status:</b>

              <Chip
                label={
                  user.is_active
                    ? "Active"
                    : "Inactive"
                }
                color={
                  user.is_active
                    ? "success"
                    : "error"
                }
              />
            </Typography>

          </CardContent>
          ) : null}
        </Card>
      </Box>
    </Box>
  );
}