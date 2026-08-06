import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  IconButton,
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Stack,
} from "@mui/material";

// ------------------------------------------------------------------
// ICON IMPORTS (used for illustration, cards, workflow, tech stack)
// ------------------------------------------------------------------
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import SecurityIcon from "@mui/icons-material/Security";
import PsychologyIcon from "@mui/icons-material/Psychology";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import ScatterPlotOutlinedIcon from "@mui/icons-material/ScatterPlotOutlined";
import ModelTrainingOutlinedIcon from "@mui/icons-material/ModelTrainingOutlined";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuIcon from "@mui/icons-material/Menu";
import CodeIcon from "@mui/icons-material/Code";
import GitHubIcon from "@mui/icons-material/GitHub";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import ArchitectureOutlinedIcon from "@mui/icons-material/ArchitectureOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

// ------------------------------------------------------------------
// COLOR TOKENS (from the provided brand palette)
// ------------------------------------------------------------------
const COLORS = {
  background: "#081B33",
  secondary: "#102A43",
  primary: "#2563EB",
  accent: "#38BDF8",
  white: "#FFFFFF",
  lightGray: "#F4F7FB",
  text: "#CBD5E1",
};

// ------------------------------------------------------------------
// STATIC DATA — kept as arrays so sections can be rendered with .map()
// ------------------------------------------------------------------
const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Features", id: "features" },
  { label: "Workflow", id: "workflow" },
  { label: "Technology", id: "technology" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

const CAPABILITY_CARDS = [
  {
    icon: <LockPersonOutlinedIcon sx={{ fontSize: 34 }} />,
    title: "Secure Authentication",
    points: ["JWT-based sessions", "Protected routes", "Role management"],
  },
  {
    icon: <PsychologyIcon sx={{ fontSize: 34 }} />,
    title: "AI Threat Prediction",
    points: ["Machine learning models", "Dynamic risk scoring", "Behaviour analysis"],
  },
  {
    icon: <DashboardCustomizeOutlinedIcon sx={{ fontSize: 34 }} />,
    title: "SOC Dashboard",
    points: ["Live analytics", "Interactive charts", "Continuous monitoring"],
  },
  {
    icon: <NotificationsActiveOutlinedIcon sx={{ fontSize: 34 }} />,
    title: "Security Alerts",
    points: ["Real-time alerting", "Activity monitoring", "CSV export"],
  },
];

const WORKFLOW_STEPS = [
  { icon: <LoginOutlinedIcon />, label: "Employee Login" },
  { icon: <TimelineOutlinedIcon />, label: "User Activity" },
  { icon: <ScatterPlotOutlinedIcon />, label: "Feature Extraction" },
  { icon: <ModelTrainingOutlinedIcon />, label: "Machine Learning" },
  { icon: <QueryStatsOutlinedIcon />, label: "Risk Score" },
  { icon: <GppMaybeOutlinedIcon />, label: "Threat Detection" },
  { icon: <WarningAmberOutlinedIcon />, label: "Security Alert" },
  { icon: <DashboardCustomizeOutlinedIcon />, label: "SOC Dashboard" },
];

const TECH_STACK = [
  { icon: <CodeIcon />, name: "React" },
  { icon: <BoltOutlinedIcon />, name: "FastAPI" },
  { icon: <MemoryOutlinedIcon />, name: "Python" },
  { icon: <DashboardCustomizeOutlinedIcon />, name: "Material UI" },
  { icon: <KeyOutlinedIcon />, name: "JWT" },
  { icon: <StorageOutlinedIcon />, name: "SQLite" },
  { icon: <ModelTrainingOutlinedIcon />, name: "Scikit-Learn" },
  { icon: <GitHubIcon />, name: "GitHub" },
];

const WHY_CARDS = [
  {
    icon: <SecurityIcon />,
    title: "Insider Threats",
    description:
      "Malicious or negligent actions from employees are harder to detect than external attacks because they originate from trusted accounts.",
  },
  {
    icon: <AutoGraphOutlinedIcon />,
    title: "Behaviour Analytics",
    description:
      "Every login, file access, and action is profiled to build a baseline of normal behaviour for each user.",
  },
  {
    icon: <ModelTrainingOutlinedIcon />,
    title: "Machine Learning",
    description:
      "Trained models score deviations from normal behaviour, surfacing patterns a manual review would miss.",
  },
  {
    icon: <MonitorHeartOutlinedIcon />,
    title: "Real-Time Monitoring",
    description:
      "Activity streams are evaluated continuously, so risk is assessed as it happens, not after the fact.",
  },
  {
    icon: <InsightsOutlinedIcon />,
    title: "Risk Prediction",
    description:
      "Each user is assigned a live risk score, allowing security teams to prioritise the accounts that matter most.",
  },
  {
    icon: <HubOutlinedIcon />,
    title: "SOC Operations",
    description:
      "All signals converge into a single operations dashboard built for fast triage and informed response.",
  },
];

const STATS = [
  { value: "100%", label: "JWT Protected" },
  { value: "24/7", label: "Monitoring" },
  { value: "AI", label: "Prediction Engine" },
  { value: "Enterprise", label: "Architecture" },
];

// Icons used purely for the hero illustration (a decorative node network)
const HERO_ORBIT_ICONS = [
  ShieldOutlinedIcon,
  PsychologyIcon,
  InsightsOutlinedIcon,
  HubOutlinedIcon,
  QueryStatsOutlinedIcon,
  VerifiedUserOutlinedIcon,
];

// ------------------------------------------------------------------
// COMPONENT
// ------------------------------------------------------------------
export default function Home() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track scroll position to add a subtle elevation/backdrop to the navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth-scrolls to a section id, closing the mobile drawer if open
  const handleNavClick = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToLogin = () => navigate("/login");

  return (
    <Box sx={{ bgcolor: COLORS.background, overflowX: "hidden" }}>
      {/* ============================================================
          1. NAVIGATION BAR
      ============================================================ */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled ? "rgba(8, 27, 51, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled ? `1px solid rgba(56, 189, 248, 0.15)` : "1px solid transparent",
          transition: "all 0.3s ease",
          boxShadow: "none",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
                height: 72,
                minHeight: 72,
                justifyContent: "space-between",
            }}
            >
            {/* Logo + Project Name */}
            <Stack
              direction="row"
              spacing={1.2}
              alignItems="center"
              sx={{ cursor: "pointer" }}
              onClick={() => handleNavClick("home")}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`,
                }}
              >
                <ShieldOutlinedIcon sx={{ color: COLORS.white, fontSize: 22 }} />
              </Box>
              <Typography
                sx={{
                  color: COLORS.white,
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  letterSpacing: "0.02em",
                }}
              >
                Insider Threat Prediction System
              </Typography>
            </Stack>

            {/* Desktop Nav Links */}
            <Stack
              direction="row"
              spacing={3.5}
              alignItems="center"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {NAV_LINKS.map((link) => (
                <Typography
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  sx={{
                    color: COLORS.text,
                    fontSize: "0.92rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "color 0.2s ease",
                    "&:hover": { color: COLORS.accent },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
              <Button
                onClick={goToLogin}
                variant="contained"
                sx={{
                  bgcolor: COLORS.primary,
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 2.6,
                  py: 0.9,
                  fontWeight: 600,
                  boxShadow: "none",
                  "&:hover": { bgcolor: COLORS.accent, boxShadow: "none" },
                }}
              >
                Launch Application
              </Button>
            </Stack>

            {/* Mobile Menu Button */}
            <IconButton
              sx={{ display: { xs: "flex", md: "none" }, color: COLORS.white }}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { bgcolor: COLORS.secondary, width: 250 } }}
      >
        <List sx={{ mt: 2 }}>
          {NAV_LINKS.map((link) => (
            <ListItem key={link.id} disablePadding>
              <ListItemButton onClick={() => handleNavClick(link.id)}>
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{ sx: { color: COLORS.text } }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 1 }} />
          <ListItem disablePadding>
            <Button
              fullWidth
              onClick={goToLogin}
              variant="contained"
              sx={{ m: 2, bgcolor: COLORS.primary, textTransform: "none" }}
            >
              Launch Application
            </Button>
          </ListItem>
        </List>
      </Drawer>

      {/* ============================================================
          2. HERO SECTION
      ============================================================ */}
      <Box
        id="home"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: { xs: 14, md: 14 },
          position: "relative",
          background: `radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.25), transparent 45%),
                       radial-gradient(circle at 10% 80%, rgba(56, 189, 248, 0.15), transparent 40%),
                       ${COLORS.background}`,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            {/* Left: Heading + CTAs */}
            <Grid item xs={12} md={6}>
              <Chip
                icon={<FiberManualRecordIcon sx={{ fontSize: "10px !important", color: `${COLORS.accent} !important` }} />}
                label="AI-POWERED INSIDER THREAT DETECTION"
                sx={{
                  bgcolor: "rgba(56, 189, 248, 0.1)",
                  color: COLORS.accent,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  fontSize: "0.72rem",
                  mb: 3,
                  border: `1px solid rgba(56, 189, 248, 0.25)`,
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  color: COLORS.white,
                  fontWeight: 800,
                  fontSize: { xs: "2.3rem", sm: "3rem", md: "3.4rem" },
                  lineHeight: 1.15,
                  mb: 3,
                }}
              >
                Predict insider threats{" "}
                <Box component="span" sx={{ color: COLORS.accent }}>
                  before they happen
                </Box>
              </Typography>
              <Typography
                sx={{
                  color: COLORS.text,
                  fontSize: "1.08rem",
                  lineHeight: 1.7,
                  mb: 4,
                  maxWidth: 520,
                }}
              >
                A machine learning-driven security operations platform that
                monitors employee behaviour, calculates real-time risk
                scores, and surfaces malicious activity before it becomes
                a breach.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  onClick={goToLogin}
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    bgcolor: COLORS.primary,
                    textTransform: "none",
                    borderRadius: "8px",
                    px: 3.5,
                    py: 1.4,
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    boxShadow: "0 8px 24px rgba(37, 99, 235, 0.35)",
                    "&:hover": { bgcolor: COLORS.accent },
                  }}
                >
                  Launch Application
                </Button>
                <Button
                  onClick={() => handleNavClick("features")}
                  variant="outlined"
                  sx={{
                    color: COLORS.white,
                    borderColor: "rgba(255,255,255,0.25)",
                    textTransform: "none",
                    borderRadius: "8px",
                    px: 3.5,
                    py: 1.4,
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    "&:hover": {
                      borderColor: COLORS.accent,
                      bgcolor: "rgba(56, 189, 248, 0.08)",
                    },
                  }}
                >
                  Explore Features
                </Button>
              </Stack>
            </Grid>

            {/* Right: Icon-based cybersecurity illustration */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  height: { xs: 340, md: 460 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Concentric rings */}
                {[420, 320, 220].map((size, i) => (
                  <Box
                    key={size}
                    sx={{
                      position: "absolute",
                      width: { xs: size * 0.65, md: size },
                      height: { xs: size * 0.65, md: size },
                      borderRadius: "50%",
                      border: `1px solid rgba(56, 189, 248, ${0.28 - i * 0.07})`,
                    }}
                  />
                ))}

                {/* Central node */}
                <Box
                  sx={{
                    width: 108,
                    height: 108,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`,
                    boxShadow: `0 0 60px rgba(56, 189, 248, 0.45)`,
                    zIndex: 2,
                  }}
                >
                  <SecurityIcon sx={{ fontSize: 50, color: COLORS.white }} />
                </Box>

                {/* Orbiting icon nodes, evenly spaced around the ring */}
                {HERO_ORBIT_ICONS.map((IconCmp, i) => {
                  const angle = (i / HERO_ORBIT_ICONS.length) * 2 * Math.PI;
                  const radius = 165;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  return (
                    <Box
                      key={i}
                      sx={{
                        position: "absolute",
                        width: 58,
                        height: 58,
                        borderRadius: "50%",
                        bgcolor: COLORS.secondary,
                        border: `1px solid rgba(56, 189, 248, 0.35)`,
                        display: { xs: i % 2 === 0 ? "flex" : "none", md: "flex" },
                        alignItems: "center",
                        justifyContent: "center",
                        transform: {
                          xs: `translate(${x * 0.62}px, ${y * 0.62}px)`,
                          md: `translate(${x}px, ${y}px)`,
                        },
                        zIndex: 2,
                      }}
                    >
                      <IconCmp sx={{ color: COLORS.accent, fontSize: 26 }} />
                    </Box>
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ============================================================
          3. CORE SECURITY CAPABILITIES
      ============================================================ */}
      <Box id="features" sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 7 }}>
            <Typography
              sx={{
                color: COLORS.accent,
                fontWeight: 700,
                letterSpacing: "0.08em",
                fontSize: "0.8rem",
                mb: 1.5,
              }}
            >
              CORE SECURITY CAPABILITIES
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: COLORS.white,
                fontWeight: 700,
                fontSize: { xs: "1.9rem", md: "2.4rem" },
              }}
            >
              Everything a modern SOC needs
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {CAPABILITY_CARDS.map((card, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card
                  sx={{
                    height: "100%",
                    p: 3.5,
                    bgcolor: COLORS.secondary,
                    borderRadius: "14px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    transition: "transform 0.25s ease, border-color 0.25s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      borderColor: "rgba(56, 189, 248, 0.4)",
                    },
                  }}
                  elevation={0}
                >
                  <Box
                    sx={{
                      width: 58,
                      height: 58,
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "rgba(37, 99, 235, 0.15)",
                      color: COLORS.accent,
                      mb: 2.5,
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography
                    sx={{ color: COLORS.white, fontWeight: 700, fontSize: "1.1rem", mb: 1.5 }}
                  >
                    {card.title}
                  </Typography>
                  <Stack spacing={0.9}>
                    {card.points.map((point) => (
                      <Stack direction="row" spacing={1} alignItems="center" key={point}>
                        <FiberManualRecordIcon sx={{ fontSize: 6, color: COLORS.accent }} />
                        <Typography sx={{ color: COLORS.text, fontSize: "0.88rem" }}>
                          {point}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ============================================================
          4. THREAT DETECTION WORKFLOW
      ============================================================ */}
      <Box id="workflow" sx={{ py: { xs: 10, md: 14 }, bgcolor: COLORS.secondary }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 7 }}>
            <Typography
              sx={{
                color: COLORS.accent,
                fontWeight: 700,
                letterSpacing: "0.08em",
                fontSize: "0.8rem",
                mb: 1.5,
              }}
            >
              HOW IT WORKS
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: COLORS.white,
                fontWeight: 700,
                fontSize: { xs: "1.9rem", md: "2.4rem" },
              }}
            >
              Threat Detection Workflow
            </Typography>
          </Box>

          <Grid container spacing={2} alignItems="stretch" justifyContent="center">
            {WORKFLOW_STEPS.map((step, idx) => (
              <React.Fragment key={step.label}>
                <Grid item xs={6} sm={4} md={"auto"}>
                  <Box
                    sx={{
                      bgcolor: COLORS.background,
                      border: "1px solid rgba(56, 189, 248, 0.2)",
                      borderRadius: "12px",
                      p: 2.5,
                      width: { xs: "100%", md: 138 },
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: 1.2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "rgba(37, 99, 235, 0.18)",
                        color: COLORS.accent,
                      }}
                    >
                      {step.icon}
                    </Box>
                    <Typography sx={{ color: COLORS.white, fontSize: "0.82rem", fontWeight: 600 }}>
                      {step.label}
                    </Typography>
                  </Box>
                </Grid>
                {/* Arrow connector between steps (not after the last one) */}
                {idx < WORKFLOW_STEPS.length - 1 && (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={"auto"}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ArrowForwardIcon
                      sx={{
                        display: { xs: "none", md: "block" },
                        color: COLORS.accent,
                        opacity: 0.6,
                      }}
                    />
                    <ArrowDownwardIcon
                      sx={{
                        display: { xs: "block", md: "none" },
                        color: COLORS.accent,
                        opacity: 0.6,
                        my: -1,
                      }}
                    />
                  </Grid>
                )}
              </React.Fragment>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ============================================================
          5. TECHNOLOGY STACK
      ============================================================ */}
      <Box id="technology" sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 7 }}>
            <Typography
              sx={{
                color: COLORS.accent,
                fontWeight: 700,
                letterSpacing: "0.08em",
                fontSize: "0.8rem",
                mb: 1.5,
              }}
            >
              BUILT WITH
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: COLORS.white,
                fontWeight: 700,
                fontSize: { xs: "1.9rem", md: "2.4rem" },
              }}
            >
              Technology Stack
            </Typography>
          </Box>

          <Grid container spacing={2.5}>
            {TECH_STACK.map((tech) => (
              <Grid item xs={6} sm={4} md={3} key={tech.name}>
                <Card
                  elevation={0}
                  sx={{
                    bgcolor: COLORS.secondary,
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    py: 3.5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1.2,
                    transition: "border-color 0.25s ease, transform 0.25s ease",
                    "&:hover": {
                      borderColor: "rgba(56, 189, 248, 0.4)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Box sx={{ color: COLORS.accent, fontSize: 30, display: "flex" }}>
                    {tech.icon}
                  </Box>
                  <Typography sx={{ color: COLORS.white, fontWeight: 600, fontSize: "0.92rem" }}>
                    {tech.name}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ============================================================
          6. DASHBOARD PREVIEW
      ============================================================ */}
      <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: COLORS.secondary }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={5}>
              <Typography
                sx={{
                  color: COLORS.accent,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  fontSize: "0.8rem",
                  mb: 1.5,
                }}
              >
                SEE IT IN ACTION
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  color: COLORS.white,
                  fontWeight: 700,
                  fontSize: { xs: "1.9rem", md: "2.2rem" },
                  mb: 2.5,
                }}
              >
                A dashboard built for the SOC
              </Typography>
              <Typography sx={{ color: COLORS.text, fontSize: "1rem", lineHeight: 1.75 }}>
                Risk scores, live alerts, and behaviour trends surface in a
                single view, giving analysts the context they need to
                respond in seconds rather than hours.
              </Typography>
            </Grid>

            <Grid item xs={12} md={7}>
              {/*
                DASHBOARD SCREENSHOT PLACEHOLDER
                Replace the Box below with an <img src="/dashboard-screenshot.png" /> 
                or similar once a real dashboard screenshot is available.
              */}
              <Box
                sx={{
                  bgcolor: COLORS.background,
                  border: "1px solid rgba(56, 189, 248, 0.25)",
                  borderRadius: "16px",
                  height: { xs: 260, md: 360 },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1.5,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
                }}
              >
                <DashboardCustomizeOutlinedIcon sx={{ fontSize: 54, color: COLORS.accent }} />
                <Typography sx={{ color: COLORS.text, fontSize: "0.92rem" }}>
                  Dashboard preview placeholder
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ============================================================
          7. WHY INSIDER THREAT DETECTION
      ============================================================ */}
      <Box id="about" sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 7 }}>
            <Typography
              sx={{
                color: COLORS.accent,
                fontWeight: 700,
                letterSpacing: "0.08em",
                fontSize: "0.8rem",
                mb: 1.5,
              }}
            >
              WHY IT MATTERS
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: COLORS.white,
                fontWeight: 700,
                fontSize: { xs: "1.9rem", md: "2.4rem" },
              }}
            >
              Why Insider Threat Detection?
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {WHY_CARDS.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.title}>
                <Box
                  sx={{
                    height: "100%",
                    p: 3.2,
                    borderRadius: "14px",
                    bgcolor: COLORS.secondary,
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <Box sx={{ color: COLORS.accent, mb: 2 }}>{item.icon}</Box>
                  <Typography sx={{ color: COLORS.white, fontWeight: 700, mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: COLORS.text, fontSize: "0.9rem", lineHeight: 1.7 }}>
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ============================================================
          8. STATISTICS SECTION
      ============================================================ */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          background: `linear-gradient(135deg, ${COLORS.primary}, #1E40AF)`,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {STATS.map((stat) => (
              <Grid item xs={6} md={3} key={stat.label}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    sx={{
                      color: COLORS.white,
                      fontWeight: 800,
                      fontSize: { xs: "2rem", md: "2.6rem" },
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      mt: 0.5,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ============================================================
          9. FOOTER
      ============================================================ */}
      <Box id="contact" sx={{ bgcolor: COLORS.background, pt: 8, pb: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 2 }}>
                <Box
                sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "9px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`,
                }}
                >
                <ShieldOutlinedIcon
                    sx={{ color: COLORS.white, fontSize: 20 }}
                />
                </Box>

                <Typography
                sx={{
                    color: COLORS.white,
                    fontWeight: 700,
                }}
                >
                Insider Threat Prediction System
                </Typography>
            </Stack>

            <Typography
                sx={{
                color: COLORS.text,
                fontSize: "0.88rem",
                lineHeight: 1.7,
                mb: 2,
                }}
            >
                An enterprise-grade platform for predicting and responding
                to insider threats using Artificial Intelligence, Machine
                Learning, and real-time behavioural analytics.
            </Typography>

            <Typography
                sx={{
                color: COLORS.white,
                fontWeight: 600,
                mb: 0.5,
                }}
            >
                Developed By
            </Typography>

            <Typography sx={{ color: COLORS.text }}>
                Ningappa Hirekudi
            </Typography>

            <Typography
                sx={{
                color: COLORS.text,
                fontSize: "0.85rem",
                }}
            >
                BE Computer Science Engineering
            </Typography>

            <Typography
                sx={{
                color: COLORS.accent,
                fontSize: "0.85rem",
                mt: 1,
                }}
            >
                • Cybersecurity • Security • AI • Machine Learning
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                {/* GitHub */}
                <IconButton
                    component="a"
                    href="https://github.com/ningappa889"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                    color: COLORS.text,
                    border: "1px solid rgba(255,255,255,0.15)",
                    "&:hover": {
                        color: "#fff",
                        bgcolor: "rgba(255,255,255,0.08)",
                        borderColor: COLORS.accent,
                    },
                    }}
                >
                    <GitHubIcon />
                </IconButton>

                {/* LinkedIn */}
                <IconButton
                    component="a"
                    href="https://www.linkedin.com/in/ningappa-hirekudi-892677346"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                    color: COLORS.text,
                    border: "1px solid rgba(255,255,255,0.15)",
                    "&:hover": {
                        color: "#0A66C2",
                        bgcolor: "rgba(10,102,194,0.12)",
                        borderColor: "#0A66C2",
                    },
                    }}
                >
                    <LinkedInIcon />
                </IconButton>

                {/* Email */}
                <IconButton
                  component="a"
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=ningappahirekudi889@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: COLORS.text,
                    border: "1px solid rgba(255,255,255,0.15)",
                    "&:hover": {
                      color: COLORS.accent,
                      bgcolor: "rgba(56,189,248,0.12)",
                      borderColor: COLORS.accent,
                    },
                  }}
                >
                  <EmailIcon />
                </IconButton>
            </Stack>
            </Grid>

            <Grid item xs={6} md={2.5}>
              <Typography sx={{ color: COLORS.white, fontWeight: 700, mb: 2, fontSize: "0.9rem" }}>
                Quick Links
              </Typography>
              <Stack spacing={1.2}>
                {NAV_LINKS.map((link) => (
                  <Typography
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    sx={{
                      color: COLORS.text,
                      fontSize: "0.86rem",
                      cursor: "pointer",
                      width: "fit-content",
                      "&:hover": { color: COLORS.accent },
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={6} md={2.5}>
              <Typography sx={{ color: COLORS.white, fontWeight: 700, mb: 2, fontSize: "0.9rem" }}>
                Technology
              </Typography>
              <Stack spacing={1.2}>
                {TECH_STACK.slice(0, 5).map((tech) => (
                  <Typography key={tech.name} sx={{ color: COLORS.text, fontSize: "0.86rem" }}>
                    {tech.name}
                  </Typography>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography sx={{ color: COLORS.white, fontWeight: 700, mb: 2, fontSize: "0.9rem" }}>
                Get Started
              </Typography>
              <Button
                onClick={goToLogin}
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: COLORS.primary,
                  textTransform: "none",
                  borderRadius: "8px",
                  mb: 1.5,
                  "&:hover": { bgcolor: COLORS.accent },
                }}
              >
                Launch Application
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<GitHubIcon />}
                href="https://github.com/ningappa889/Insider_threat_prediction_system"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                    color: COLORS.white,
                    borderColor: "rgba(255,255,255,0.2)",
                    textTransform: "none",
                    borderRadius: "8px",
                    "&:hover": {
                    borderColor: COLORS.accent,
                    color: COLORS.accent,
                    },
                }}
                >
                View Source Code
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", my: 4 }} />

          <Typography
            sx={{
                color: COLORS.text,
                fontSize: "0.8rem",
                textAlign: "center",
                opacity: 0.75,
            }}
            >
            © {new Date().getFullYear()} Insider Threat Prediction System |
            Designed & Developed by <b>Ningappa Hirekudi</b>.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
