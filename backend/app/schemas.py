from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True

class JobCreate(BaseModel):
    title: str
    company: str
    location: str
    employment_type: str
    experience: str
    skills: str
    description: str


class JobResponse(JobCreate):
    id: int

    class Config:
        from_attributes = True


class CandidateCreate(BaseModel):
    name: str
    email: str
    phone: str
    skills: str
    experience: str
    job_id: int


class CandidateResponse(CandidateCreate):
    id: int
    resume: Optional[str] = None
    score: int

    class Config:
        from_attributes = True