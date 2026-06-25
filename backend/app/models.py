from sqlalchemy import Column, Integer, String
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False)

from sqlalchemy import Column, Integer, String, Text

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    company = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    employment_type = Column(String(100), nullable=False)
    experience = Column(String(100), nullable=False)
    skills = Column(Text, nullable=False)
    description = Column(Text, nullable=False)

from sqlalchemy import ForeignKey

class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(255), nullable=False)

    email = Column(String(255), nullable=False)

    phone = Column(String(20), nullable=False)

    resume = Column(String(255), nullable=True)

    skills = Column(Text, nullable=True)

    experience = Column(String(100), nullable=True)

    score = Column(Integer, default=0)

    job_id = Column(Integer, ForeignKey("jobs.id"))

    