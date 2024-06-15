
import sys
sys.path.append("..")

from fastapi import Depends, APIRouter, Request, Form, HTTPException
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from .auth import get_current_user
from fastapi.responses import JSONResponse
from starlette import status
import schemas
# from database import get_db

router = APIRouter(
    prefix="/todos",
    tags=["todos"],
    responses={404: {"description": "Not found"}}
)

models.Base.metadata.create_all(bind=engine)


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()








@router.get("/", response_class=JSONResponse)
async def read_all_by_user(request: Request, db: Session = Depends(get_db)):

    user = await get_current_user(request)
    # print(user)
    if user is None:
        return JSONResponse(content={"error": "Unauthorized"}, status_code=status.HTTP_401_UNAUTHORIZED)

    todos = db.query(models.Todos).filter(models.Todos.owner_id == user.get("id")).all()
    todos_json = [{"id": todo.id, "title": todo.title, "description": todo.description, "priority": todo.priority, "complete": todo.complete} for todo in todos]
    print(todos_json)
    return JSONResponse(content=todos_json)


@router.post("/add-todo", response_model=schemas.Todos)
async def create_todo(request: Request, todo_add: dict, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    if current_user is None:
        raise HTTPException(status_code=401, detail="Unauthorized")

    title = todo_add.get("title")
    description = todo_add.get("description")
    priority = todo_add.get("priority")

    todo_model = models.Todos(
        title=title,
        description=description,
        priority=priority,
        complete=False,
        owner_id=current_user.get("id")
    )

    db.add(todo_model)
    db.commit()
    db.refresh(todo_model)

    return todo_model



@router.get("/{todo_id}", response_class=JSONResponse)
async def read_todo_by_id(todo_id: int, request: Request, db: Session = Depends(get_db)):
    user = await get_current_user(request)
    if user is None:
        return JSONResponse(content={"error": "Unauthorized"}, status_code=status.HTTP_401_UNAUTHORIZED)

    todo = db.query(models.Todos).filter(models.Todos.id == todo_id, models.Todos.owner_id == user.get("id")).first()
    if todo is None:
        return JSONResponse(content={"error": "Todo not found"}, status_code=status.HTTP_404_NOT_FOUND)

    todo_json = {"id": todo.id, "title": todo.title, "description": todo.description, "priority": todo.priority, "complete": todo.complete}
    return JSONResponse(content=todo_json)



# ===============

@router.put("/edit-todo/{todo_id}", response_model=schemas.TodoEdit)
async def edit_todo_commit(todo_id: int, todo_edit: dict, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):

    if current_user is None:
        raise HTTPException(status_code=401, detail="Unauthorized")

    title = todo_edit.get("title")
    description = todo_edit.get("description")
    priority = todo_edit.get("priority")

    todo_model = db.query(models.Todos).filter(models.Todos.id == todo_id).first()
    if todo_model is None or todo_model.owner_id != current_user.get("id"):
        raise HTTPException(status_code=404, detail="Todo not found")

    todo_model.title = title
    todo_model.description = description
    todo_model.priority = priority

    db.add(todo_model)
    db.commit()

    return todo_model



@router.delete("/delete/{todo_id}", status_code=204)
async def delete_todo(todo_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    
    if current_user is None:
        raise HTTPException(status_code=401, detail="Unauthorized")

    todo_model = db.query(models.Todos).filter(models.Todos.id == todo_id).first()
    
    if todo_model is None or todo_model.owner_id != current_user.get("id"):
        raise HTTPException(status_code=404, detail="Todo not found")

    db.delete(todo_model)
    db.commit()

    return None


@router.put("/complete/{todo_id}", response_model=schemas.Todos)
async def complete_todo(request: Request, todo_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    if current_user is None:
        raise HTTPException(status_code=401, detail="Unauthorized")

    todo = db.query(models.Todos).filter(models.Todos.id == todo_id).first()

    if todo is None or todo.owner_id != current_user.get("id"):
        raise HTTPException(status_code=404, detail="Todo not found")

    todo.complete = not todo.complete

    db.add(todo)
    db.commit()

    return todo