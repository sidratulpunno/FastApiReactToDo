
# =================================

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from routers import auth, todos

app = FastAPI()


models.Base.metadata.create_all(bind=engine)

# CORS (Cross-Origin Resource Sharing) setup
origins = [
    "http://localhost:3000",
    # Add additional origins as needed
]



app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(todos.router)
