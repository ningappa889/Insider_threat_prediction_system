import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import TimelineIcon from "@mui/icons-material/Timeline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import PsychologyIcon from "@mui/icons-material/Psychology";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const drawerWidth = 240;

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    text: "Activities",
    icon: <TimelineIcon />,
    path: "/activities",
  },
  {
    text: "Alerts",
    icon: <WarningAmberIcon />,
    path: "/alerts",
  },
  {
    text: "Predictions",
    icon: <PsychologyIcon />,
    path: "/prediction",
  },
  {
    text: "Users",
    icon: <PeopleIcon />,
    path: "/users",
  },
  {
    text: "Profile",
    icon: <AccountCircleIcon />,
    path: "/profile",
  },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleNavClick = (path) => {
    if (path === "/dashboard") {
      if (location.pathname === "/dashboard") {
        window.location.reload();
      } else {
        window.location.href = "/dashboard";
      }
    } else {
      navigate(path);
    }
  };

  const handleConfirmLogout = () => {
    setLogoutDialogOpen(false);
    logout();
    navigate("/");
  };

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Insider Threat
            </Typography>

            <Typography variant="body2">
              SOC Dashboard
            </Typography>
          </Box>
        </Toolbar>

        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => handleNavClick(item.path)}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>

              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}

          <ListItemButton
            onClick={() => setLogoutDialogOpen(true)}
          >
            <ListItemIcon>
              <LogoutIcon color="error" />
            </ListItemIcon>

            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
            minWidth: 320,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>
          Confirm Logout
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out of the Insider Threat SOC Dashboard?
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setLogoutDialogOpen(false)}
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmLogout}
            sx={{ borderRadius: 2 }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}