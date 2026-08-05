# Insider Threat Prediction System

An AI-powered Insider Threat Prediction System developed using **FastAPI**, **React**, **SQLite**, and **Machine Learning**. The system analyzes user activities, predicts insider threats, calculates risk scores, generates alerts, and provides a real-time security dashboard.

---

## Features

### Authentication
- JWT Authentication
- Secure Login
- User Profile
- Logout

### Dashboard
- Total Users
- Total Activities
- Total Alerts
- High Risk Users
- Average Risk Score
- Critical Alerts
- High Risk Activities
- Risk Trend Chart
- Alert Severity Chart
- Top Activity Types

### AI Prediction
- Insider Threat Prediction
- Confidence Score
- Risk Level
- Risk Score Calculation

### Activity Management
- Activity Monitoring
- Search Activities
- Severity Filter
- Status Filter
- CSV Export

### Alert Management
- Security Alerts
- Search Alerts
- Severity Filter
- CSV Export

### User Management
- View Users
- Search Users
- User Profile

---

# Technology Stack

## Frontend

- React.js
- Material UI
- Axios
- React Router
- Recharts

## Backend

- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication
- Pydantic

## Machine Learning

- Python
- Scikit-learn
- Joblib

---

# Project Structure

```
insider_threat_prediction/

│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── database/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.jsx
│
└── README.md
```

---

# Installation

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# API Endpoints

## Authentication

```
POST /auth/register

POST /auth/login
```

## Users

```
GET /users/

GET /users/me
```

## Activities

```
GET /activities/

POST /activities/

GET /activities/{id}
```

## Alerts

```
GET /alerts/
```

## Dashboard Statistics

```
GET /stats/
```

## Prediction

```
POST /prediction/
```

---

# Security Features

- JWT Authentication
- Risk Score Calculation
- Insider Threat Detection
- Brute Force Detection
- Privilege Escalation Detection
- USB Data Theft Detection
- PowerShell Execution Detection
- Alert Generation
- Activity Monitoring

---

# Screenshots

Add screenshots of:

- Login Page
- Dashboard
- Prediction
- Activities
- Alerts
- Users
- Profile

---

# Future Enhancements

- Email Notifications
- Role-Based Access Control
- Live Activity Monitoring
- SIEM Integration
- PostgreSQL Support
- Docker Deployment
- Cloud Deployment
- Multi-Factor Authentication

---

# Author

**Ningappa Hirekudi**

Bachelor of Engineering (Computer Science & Engineering)

VTU

---

# License

This project is developed for educational purposes.