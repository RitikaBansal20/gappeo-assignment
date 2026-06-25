# 🚀 Gappeo ATS (Applicant Tracking System)

A full-stack **Applicant Tracking System (ATS)** built using **FastAPI**, **React (Vite + TypeScript)**, **PostgreSQL**, and **Render**. The application helps recruiters manage jobs, candidates, resume uploads, and AI-powered resume matching.

---

## ✨ Features

### Authentication

* User Registration
* User Login using JWT Authentication
* Protected Routes

### Dashboard

* Total Jobs
* Total Candidates
* Average Match Score
* Recruitment Overview

### Job Management

* Create Job
* View Jobs
* Edit Job
* Delete Job

### Candidate Management

* Add Candidate
* View Candidates
* Edit Candidate
* Delete Candidate
* Upload Resume (PDF/DOCX)

### Resume Analysis

* Extract Resume Text
* AI-Based Resume Matching
* Resume Match Score
* Hiring Recommendation

---

# 🛠️ Tech Stack

## Frontend

* React
* TypeScript
* Vite
* Axios
* React Router DOM

## Backend

* FastAPI
* SQLAlchemy
* JWT Authentication
* Pydantic
* Python

## Database

* PostgreSQL (Neon)

## Deployment

* Render (Backend)
* Render Static Site (Frontend)

---

# 📁 Project Structure

```
gappeo-assignment/
│
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   ├── services/
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── database.py
│   │   └── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.tsx
│   └── package.json
│
└── docker-compose.yml
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/RitikaBansal20/gappeo-assignment.git
cd gappeo-assignment
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file inside the **backend** directory:

```env
DATABASE_URL=your_postgresql_connection_string
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Run the backend:

```bash
uvicorn app.main:app --reload
```

Backend URL:

```
http://127.0.0.1:8000
```

Swagger Documentation:

```
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```
http://localhost:5173
```

---

# 📡 API Endpoints

## Authentication

```
POST /auth/register
POST /auth/login
```

## Dashboard

```
GET /dashboard
```

## Jobs

```
GET /jobs
POST /jobs
PUT /jobs/{id}
DELETE /jobs/{id}
```

## Candidates

```
GET /candidates
POST /candidates
PUT /candidates/{id}
DELETE /candidates/{id}
POST /candidates/{id}/upload-resume
GET /candidates/{id}/match
```

---

# 🚀 Deployment

## Backend

Deployed on **Render**

```
https://gappeo-assignment.onrender.com
```

## Frontend

Deployed on **Render Static Site**

```
https://gappeo-assignment-1.onrender.com
```

---

# 📸 Application Screens

* Dashboard
* Job Management
* Candidate Management
* Resume Upload
* Resume Match Score
* Authentication

---

# 🔮 Future Improvements

* Email Notifications
* Candidate Search & Filters
* Resume Ranking
* AI Interview Feedback
* Recruiter Analytics Dashboard
* Pagination
* Role-Based Access Control

---

# 👩‍💻 Author

**Ritika Bansal**

GitHub: https://github.com/RitikaBansal20

LinkedIn: *(Add your LinkedIn profile URL here)*

---

# 📄 License

This project is developed as part of a Full Stack Developer assignment and is intended for learning and evaluation purposes.
