# 🛡️ Insider Threat Prediction System

[![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)](https://www.python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.116-009688?logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vitejs.dev)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql)](https://www.postgresql.org)
[![SQLite](https://img.shields.io/badge/Database-SQLite-003B57?logo=sqlite)](https://www.sqlite.org)
[![Scikit-Learn](https://img.shields.io/badge/Machine%20Learning-Scikit--learn-orange?logo=scikitlearn)](https://scikit-learn.org)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

An AI-powered **Insider Threat Prediction System** that monitors user activities, predicts insider threats using Machine Learning, calculates risk scores, generates security alerts, and provides an interactive Security Operations Center (SOC) dashboard.

---

# 🚀 Live Demo

| Service | URL |
|---------|-----|
| 🌐 Frontend | https://insider-threat-prediction-system.vercel.app |
| ⚙️ Backend API | https://insider-threat-backend-z0f0.onrender.com |
| 📘 API Documentation | https://insider-threat-backend-z0f0.onrender.com/docs |

> **Note:** The backend is hosted on Render's free tier. The first request after inactivity may take 30–60 seconds while the service starts up.

---

# 📖 Project Overview

The Insider Threat Prediction System is a full-stack web application that helps identify potential insider threats by analyzing user activities and estimating risk levels using Machine Learning.

The system provides:

- Secure JWT-based authentication
- User activity monitoring
- Risk score calculation & threat detection
- Security alerts management
- Machine learning prediction engine
- Interactive SOC dashboard with real-time statistics
- CSV export for activities and alerts
- Persistent Cloud Database (PostgreSQL & SQLite) support
- Indian Standard Time (IST - Asia/Kolkata) timestamp support across all modules

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
- Live Risk Trend & Alert Distribution Charts

---

## 📈 Activities

- View Activities
- Search Activities
- Filter by Severity & Status
- Risk Score Display
- CSV Export

---

## 🚨 Alerts

- View Security Alerts
- Alert Severity & Status
- Alert Details & Descriptions
- CSV Export

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
            PostgreSQL / SQLite DB
                        │
                        ▼
          Machine Learning Model
              (Scikit-learn)
```

---

# 🛠️ Technology Stack

Click on any technology below to visit its official documentation:

## Frontend

- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Material UI](https://mui.com)
- [React Router](https://reactrouter.com)
- [Axios](https://axios-http.com)

## Backend

- [FastAPI](https://fastapi.tiangolo.com)
- [SQLAlchemy](https://www.sqlalchemy.org)
- [Pydantic](https://docs.pydantic.dev)
- [JWT Authentication](https://jwt.io)
- [Python](https://www.python.org)

## Database

- [PostgreSQL (Neon / Supabase)](https://www.postgresql.org)
- [SQLite](https://www.sqlite.org)

## Machine Learning

- [Scikit-learn](https://scikit-learn.org)
- [Pandas](https://pandas.pydata.org)
- [NumPy](https://numpy.org)
- [Joblib](https://joblib.readthedocs.io)

## Deployment

- [Vercel](https://vercel.com)
- [Render](https://render.com)
- [GitHub](https://github.com)

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

Swagger API Documentation:

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
APP_NAME="Insider Threat Prediction System"
APP_VERSION="1.0.0"

DEBUG=True

HOST="127.0.0.1"

PORT=8000

SECRET_KEY="your_secret_key_here"

ALGORITHM="HS256"

ACCESS_TOKEN_EXPIRE_MINUTES=1440

DATABASE_URL="postgresql://username:password@ep-xyz.neon.tech/neondb?sslmode=require"
```

---

## Frontend (.env)

```env
VITE_API_URL=https://insider-threat-backend-z0f0.onrender.com
```

---

# 🧪 Testing

The application has been tested for:

- User Registration & Login
- JWT Authentication
- Cloud Database Persistence (PostgreSQL & SQLite)
- Indian Standard Time (IST) formatting
- Dashboard Statistics & Interactive Charts
- Activities Search & Severity Filtering
- CSV Data Export
- Alerts Page
- Prediction Module
- Users & Profile Management
- Browser Refresh & Cloud Deployment (Render & Vercel)

---

# 🚀 Future Enhancements

- Docker Support
- Role-Based Access Control (RBAC)
- Email Notifications
- Multi-Factor Authentication (MFA)
- AI Model Improvements
- Real-time WebSockets Notifications

---

# 👨‍💻 Author

**Ningappa Hirekudi**

Bachelor of Engineering (Computer Science & Engineering)

Visvesvaraya Technological University (VTU)

GitHub: https://github.com/ningappa889

LinkedIn: https://www.linkedin.com/in/ningappa-hirekudi-892677346

---

# 📄 License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for more information.

---

# ⭐ Support

If you found this project useful, consider giving it a **⭐ Star** on GitHub.