from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import SessionLocal
from app import models

from app.database import Base, engine
from app.routers import auth, jobs, candidates
import app.models

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Gappeo ATS API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(jobs.router)
app.include_router(candidates.router)

@app.get("/")
def root():
    return {"message": "Welcome to Gappeo ATS API 🚀"}

@app.get("/dashboard")
def dashboard():
    db = SessionLocal()

    jobs = db.query(models.Job).count()
    candidates = db.query(models.Candidate).count()

    avg_score = db.query(models.Candidate).all()

    average = 0
    if avg_score:
        average = sum(c.score for c in avg_score) / len(avg_score)

    recent_jobs = (
        db.query(models.Job)
        .order_by(models.Job.id.desc())
        .limit(5)
        .all()
    )

    recent_candidates = (
        db.query(models.Candidate)
        .order_by(models.Candidate.id.desc())
        .limit(5)
        .all()
    )

    db.close()

    return {
        "jobs": jobs,
        "candidates": candidates,
        "average_score": round(average, 2),
        "recent_jobs": recent_jobs,
        "recent_candidates": recent_candidates,
    }


@app.get("/recent-jobs")
def recent_jobs():

    db = SessionLocal()

    jobs = (
        db.query(models.Job)
        .order_by(models.Job.id.desc())
        .limit(5)
        .all()
    )

    db.close()

    return jobs


@app.get("/recent-candidates")
def recent_candidates():

    db = SessionLocal()

    candidates = (
        db.query(models.Candidate)
        .order_by(models.Candidate.id.desc())
        .limit(5)
        .all()
    )

    db.close()

    return candidates