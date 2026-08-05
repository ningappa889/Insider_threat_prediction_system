import { Link, useLocation, useNavigate } from "react-router-dom";
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

  return (
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
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>

            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}

        <ListItemButton
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}