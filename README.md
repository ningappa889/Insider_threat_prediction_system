# 🛡️ Insider Threat Prediction System

![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.116-009688?logo=fastapi)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![SQLite](https://img.shields.io/badge/Database-SQLite-003B57?logo=sqlite)
![Machine Learning](https://img.shields.io/badge/Machine%20Learning-Scikit--learn-orange)
![License](https://img.shields.io/badge/License-MIT-green)

An AI-powered **Insider Threat Prediction System** that monitors user activities, predicts insider threats using Machine Learning, calculates risk scores, generates security alerts, and provides an interactive Security Operations Center (SOC) dashboard.

---

# 🚀 Live Demo

| Service | URL |
|---------|-----|
| 🌐 Frontend | https://insider-threat-prediction-system.vercel.app |
| ⚙️ Backend API | https://insider-threat-backend-z0f0.onrender.com |
| 📘 API Documentation | https://insider-threat-backend-z0f0.onrender.com/docs |

> **Note:** The backend is hosted on Render's free tier. The first request after inactivity may take 30–60 seconds while the service starts.

---

# 📖 Project Overview

The Insider Threat Prediction System is a full-stack web application that helps identify potential insider threats by analyzing user activities and estimating risk levels using Machine Learning.

The system provides:

- Secure JWT-based authentication
- User activity monitoring
- Risk score calculation
- Security alerts
- Threat prediction
- Interactive dashboard with real-time statistics
- CSV export for activities

The project demonstrates the integration of **FastAPI**, **React**, **SQLite**, **Scikit-learn**, and **REST APIs** in a production-style application.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- User Profile
- Logout

---

## 📊 Dashboard

Displays important security statistics including:

- Total Users
- Total Activities
- Total Alerts
- High Risk Users
- Average Risk Score
- Critical Alerts
- High Risk Activities

---

## 📈 Activities

- View Activities
- Search Activities
- Filter by Severity
- Filter by Status
- Risk Score Display
- CSV Export

---

## 🚨 Alerts

- View Security Alerts
- Alert Severity
- Alert Status
- Alert Details

---

## 🤖 Insider Threat Prediction

- Machine Learning Prediction
- Risk Score Generation
- Threat Classification

---

## 👥 User Management

- View Users
- User Profiles
- Account Management

---

# 🏗️ System Architecture

```
                   React + Vite
                        │
                  Axios REST API
                        │
                        ▼
                 FastAPI Backend
        ┌─────────────────────────────┐
        │ Authentication (JWT)        │
        │ User Management             │
        │ Activity Monitoring         │
        │ Alert Management            │
        │ Prediction Engine           │
        │ Dashboard Statistics        │
        └─────────────────────────────┘
                        │
                  SQLAlchemy ORM
                        │
                        ▼
                 SQLite Database
                        │
                        ▼
          Machine Learning Model
              (Scikit-learn)
```

---

# 🛠️ Technology Stack

## Frontend

- React
- Vite
- Material UI
- React Router
- Axios

## Backend

- FastAPI
- SQLAlchemy
- Pydantic
- JWT Authentication
- Python

## Database

- SQLite

## Machine Learning

- Scikit-learn
- Pandas
- NumPy
- Joblib

## Deployment

- Vercel
- Render
- GitHub

---

# 📂 Project Structure

```
Insider_threat_prediction_system/

├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── database/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── docs/
│
├── README.md
│
└── LICENSE
```

---

# 📷 Screenshots

## Login

![Login](docs/login.png)

---

## Dashboard

![Dashboard](docs/dashboard.png)

---

## Activities

![Activities](docs/activities.png)

---

## Alerts

![Alerts](docs/alerts.png)

---

## Prediction

![Prediction](docs/prediction.png)

---

## Users

![Users](docs/users.png)

---

## Profile

![Profile](docs/profile.png)

---

# 🔗 API Endpoints

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

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/ningappa889/Insider_threat_prediction_system.git

cd Insider_threat_prediction_system
```

---

## Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux/macOS
source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend:

```
http://127.0.0.1:8000
```

Swagger API:

```
http://127.0.0.1:8000/docs
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```
http://localhost:5173
```

---

# 🔧 Environment Variables

## Backend (.env)

```env
APP_NAME=
APP_VERSION=

DEBUG=

HOST=

PORT=

SECRET_KEY=

ALGORITHM=

ACCESS_TOKEN_EXPIRE_MINUTES=

DATABASE_URL=
```

---

## Frontend (.env)

```env
VITE_API_URL=https://insider-threat-backend-z0f0.onrender.com
```

---

# 🧪 Testing

The deployed application has been tested for:

- User Registration
- User Login
- JWT Authentication
- Dashboard Statistics
- Activities Page
- Search & Filters
- CSV Export
- Alerts Page
- Prediction Module
- Users Page
- Profile Page
- Logout
- Browser Refresh
- Cloud Deployment (Render & Vercel)

---

# 🚀 Future Enhancements

- PostgreSQL Integration
- Docker Support
- Role-Based Access Control (RBAC)
- Email Notifications
- Multi-Factor Authentication (MFA)
- AI Model Improvements
- Audit Logging
- Real-time Notifications

---

# 👨‍💻 Author

**Ningappa Hirekudi**

Bachelor of Engineering (Computer Science & Engineering)

Visvesvaraya Technological University (VTU)

GitHub: https://github.com/ningappa889

---

# 📄 License

This project is licensed under the **MIT License**.

See the LICENSE file for more information.

---

# ⭐ Support

If you found this project useful, consider giving it a **⭐ Star** on GitHub.