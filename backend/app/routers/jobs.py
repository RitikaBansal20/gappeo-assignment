from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.database import get_db
from app import models, schemas

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)


@router.post("/", response_model=schemas.JobResponse)
def create_job(job: schemas.JobCreate, db: Session = Depends(get_db)):
    new_job = models.Job(
        title=job.title,
        company=job.company,
        location=job.location,
        employment_type=job.employment_type,
        experience=job.experience,
        skills=job.skills,
        description=job.description
    )

    db.add(new_job)
    db.commit()
    db.refresh(new_job)

    return new_job

@router.get("/", response_model=list[schemas.JobResponse])
def get_all_jobs(db: Session = Depends(get_db)):
    return db.query(models.Job).all()

@router.get("/{job_id}", response_model=schemas.JobResponse)
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(models.Job).filter(models.Job.id == job_id).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    return job

@router.put("/{job_id}", response_model=schemas.JobResponse)
def update_job(job_id: int, updated_job: schemas.JobCreate, db: Session = Depends(get_db)):
    job = db.query(models.Job).filter(models.Job.id == job_id).first()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    job.title = updated_job.title
    job.company = updated_job.company
    job.location = updated_job.location
    job.employment_type = updated_job.employment_type
    job.experience = updated_job.experience
    job.skills = updated_job.skills
    job.description = updated_job.description

    db.commit()
    db.refresh(job)

    return job

@router.delete("/{job_id}")
def delete_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(models.Job).filter(models.Job.id == job_id).first()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    db.delete(job)
    db.commit()

    return {
        "message": "Job deleted successfully"
    }

@router.delete("/{job_id}")
def delete_job(job_id: int, db: Session = Depends(get_db)):

    job = db.query(models.Job).filter(
        models.Job.id == job_id
    ).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    db.delete(job)
    db.commit()

    return {
        "message": "Job deleted successfully"
    }


@router.put("/{job_id}")
def update_job(
    job_id: int,
    updated: schemas.JobCreate,
    db: Session = Depends(get_db)
):

    job = db.query(models.Job).filter(
        models.Job.id == job_id
    ).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    job.title = updated.title
    job.company = updated.company
    job.location = updated.location
    job.employment_type = updated.employment_type
    job.experience = updated.experience
    job.skills = updated.skills
    job.description = updated.description

    db.commit()
    db.refresh(job)

    return job