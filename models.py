from sqlalchemy import Boolean, Column, Integer, String, ForeignKey,DateTime
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime
from pydantic import BaseModel

class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    secret_key = Column(String)
    salt = Column(String)
    is_active = Column(Boolean, default=False)
    updated_at = Column(DateTime, nullable=True, default=None, onupdate=datetime.now)
    uid = Column(String, unique=True, index=True)


class Pass(Base):
    __tablename__ = "pass"

    esk = Column(String, primary_key=True)
    hashed_password = Column(String)

class Todos(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    priority = Column(Integer)
    complete = Column(Boolean, default=False)
    owner_id = Column(Integer, ForeignKey("users.id"))
