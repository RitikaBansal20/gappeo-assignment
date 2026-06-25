from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.services.resume_parser import extract_resume_text
from app.services.ai_service import calculate_match
from app.services.ai_service import calculate_match
from fastapi import UploadFile, File
import shutil
import os

from app.database import SessionLocal
from app import models, schemas

router = APIRouter(
    prefix="/candidates",
    tags=["Candidates"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=schemas.CandidateResponse)
def create_candidate(candidate: schemas.CandidateCreate, db: Session = Depends(get_db)):
    new_candidate = models.Candidate(**candidate.dict())

    db.add(new_candidate)
    db.commit()
    db.refresh(new_candidate)

    return new_candidate


@router.get("/", response_model=list[schemas.CandidateResponse])
def get_all_candidates(db: Session = Depends(get_db)):
    return db.query(models.Candidate).all()


@router.get("/{candidate_id}", response_model=schemas.CandidateResponse)
def get_candidate(candidate_id: int, db: Session = Depends(get_db)):
    candidate = db.query(models.Candidate).filter(
        models.Candidate.id == candidate_id
    ).first()

    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")

    return candidate


@router.put("/{candidate_id}", response_model=schemas.CandidateResponse)
def update_candidate(
    candidate_id: int,
    updated: schemas.CandidateCreate,
    db: Session = Depends(get_db),
):
    candidate = db.query(models.Candidate).filter(
        models.Candidate.id == candidate_id
    ).first()

    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")

    candidate.name = updated.name
    candidate.email = updated.email
    candidate.phone = updated.phone
    candidate.skills = updated.skills
    candidate.experience = updated.experience
    candidate.job_id = updated.job_id

    db.commit()
    db.refresh(candidate)

    return candidate


@router.delete("/{candidate_id}")
def delete_candidate(candidate_id: int, db: Session = Depends(get_db)):
    candidate = db.query(models.Candidate).filter(
        models.Candidate.id == candidate_id
    ).first()

    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")

    db.delete(candidate)
    db.commit()

    return {
        "message": "Candidate deleted successfully"
    }


@router.post("/{candidate_id}/upload-resume")
def upload_resume(
    candidate_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    candidate = db.query(models.Candidate).filter(
        models.Candidate.id == candidate_id
    ).first()

    if not candidate:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found"
        )

    upload_dir = "app/uploads"

    os.makedirs(upload_dir, exist_ok=True)

    file_path = os.path.join(upload_dir, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    candidate.resume = file_path

    resume_text = extract_resume_text(file_path)

    candidate.skills = resume_text[:1000]

    db.commit()
    db.refresh(candidate)

    return {
    "message": "Resume uploaded successfully",
    "resume_preview": resume_text[:500]
    }


@router.get("/{candidate_id}/match")
def match_candidate(candidate_id: int, db: Session = Depends(get_db)):

    candidate = db.query(models.Candidate).filter(
        models.Candidate.id == candidate_id
    ).first()

    if not candidate:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found"
        )

    job = db.query(models.Job).filter(
        models.Job.id == candidate.job_id
    ).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    result = calculate_match(
        job.skills,
        candidate.skills or ""
    )

    candidate.score = result["score"]

    db.commit()

    return {
    "candidate": candidate.name,
    "job": job.title,
    "score": result["score"],
    "matched_skills": result["matched_skills"],
    "missing_skills": result["missing_skills"],
    "recommendation": result["recommendation"]
    }