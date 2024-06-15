from datetime import datetime
from pydantic import BaseModel

class UserBase(BaseModel):
    email: str
    username: str
    first_name: str
    last_name: str
    password: str



class PassBase(BaseModel):
    username: str
    password: str


class Todos(BaseModel):
    id: int
    title: str
    description: str
    priority: int
    complete: bool
    owner_id: int

    class Config:
        orm_mode = True


class TodoCreate(BaseModel):
    title: str
    description: str
    priority: int


class TodoEdit(BaseModel):
    title: str
    description: str
    priority: int
