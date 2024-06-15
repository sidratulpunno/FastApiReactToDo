import sys
import secrets

import asyncio

import bcrypt

sys.path.append("..")
from starlette.responses import JSONResponse
from fastapi.responses import JSONResponse
from fastapi import Depends, HTTPException, status, APIRouter, Request, Response, Form
from pydantic import BaseModel
from typing import Optional
import models
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi.responses import RedirectResponse
import firebase_admin
from firebase_admin import credentials, auth
import schemas

import pyrebase
from getpass import getpass

import models



SECRET_KEY = "ba58c4e2355ca9ecf71c9f64419364528e778df94608dc2cf38b91c9f4003ea7"
ALGORITHM = "HS256"

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

models.Base.metadata.create_all(bind=engine)

oauth2_bearer = OAuth2PasswordBearer(tokenUrl="token")


firebaseConfig = {
  
}

firebase = pyrebase.initialize_app(firebaseConfig)

authen = firebase.auth()


cred = credentials.Certificate("")
firebase_admin.initialize_app(cred)

def gen_salt() -> str:
    return secrets.token_urlsafe(20)


def gen_secret() -> str:
    return secrets.token_urlsafe(20)

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
    responses={401: {"user": "Not authorized"}}
)

from typing import Optional

class LoginForm:
    def __init__(self, username: str, password: str):
        self.username: str = username
        self.password: str = password

    @classmethod
    async def create_from_json(cls, json_data: dict):
        username = json_data.get("username")
        password = json_data.get("password")
        return cls(username, password)

from pydantic import BaseModel

class LoginForm(BaseModel):
    username: str
    password: str


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def get_password_hash(password, salt):
    return bcrypt_context.hash(password + salt)


def verify_password(plain_password, hashed_password, salt):
    return bcrypt_context.verify(plain_password + salt, hashed_password)


def authenticate_user(username: str, password: str, db):
    # print("user ny 8")
    user = db.query(models.Users).filter(models.Users.username == username).first()
    if user:
        uid = user.uid
        salt = user.salt
        secret_key = user.secret_key
        hashed_secret_key = bcrypt.hashpw(secret_key, salt)
        # eskv = get_esk(user.salt, user.secret_key,models.Pass.esk)

        try:

            user_verify = auth.get_user(uid)
            if user_verify.email_verified:
                passes = db.query(models.Pass).filter(models.Pass.esk == hashed_secret_key).first()
                if passes:
                    return user
        except auth.UserNotFoundError:
            return "Please verify your email first."
        except Exception as e:
            print(f"Error: {e}")
            return False

    # User not found in the database or authentication failed
    return False



def create_access_token(username: str, user_id: int, expires_delta: Optional[timedelta] = None):
    encode = {"sub": username, "id": user_id}
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)  # before that minutes = 15 
    encode.update({"exp": expire})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)


# ===================
async def get_current_user(request: Request) -> Optional[dict]:
    try:
        token = request.headers.get("Authorization")
        # print(request.headers)
        if token is None:
            return None

        token = token.split("Bearer ")[1]

        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        user_id: int = payload.get("id")

        if username is None or user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")

        return {"username": username, "id": user_id}
    except (JWTError, IndexError):
        return None


@router.post("/login")
async def login_for_access_token(req_user: schemas.PassBase, response: Response,
                                 db: Session = Depends(get_db)):
    # Attempt user authentication
    user = authenticate_user(req_user.username, req_user.password, db)
    # Print form data for debugging purposes (optional)  # print(form_data)  # Uncomment if needed
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    token_expires = timedelta(minutes=60)
    token = create_access_token(user.username, user.id, expires_delta=token_expires)
    # Return data with both token and cookie setting for flexibility
    return {"access_token": token, "token_type": "bearer"}


@router.post("/logout")
async def logout(request: Request):
    response = JSONResponse(content={"message": "Logout successful"})
    response.delete_cookie(key="access_token")
    return response


@router.post("/register/")
async def register_user(requested_user: schemas.UserBase, db: Session = Depends(get_db)):

    validation1 = db.query(models.Users).filter(models.Users.username == requested_user.username).first()
    validation2 = db.query(models.Users).filter(models.Users.email == requested_user.email).first()

    if validation1 is not None or validation2 is not None:
        raise HTTPException(status_code=422, detail="Invalid registration request")

    user_model = models.Users()

    salt = bcrypt.gensalt()
    hash_password = bcrypt.hashpw(requested_user.password.encode(), bcrypt.gensalt())

    secret_key = bcrypt.hashpw(requested_user.email.encode(), bcrypt.gensalt())

    user = authen.create_user_with_email_and_password(requested_user.email, hash_password.decode())
    Login = authen.sign_in_with_email_and_password(requested_user.email, hash_password.decode())
    authen.send_email_verification(Login['idToken'])
    uid = user['localId']
    new_user = models.Users(email = requested_user.email, username = requested_user.username, first_name = requested_user.first_name, last_name =requested_user.last_name, secret_key = secret_key, salt = salt, uid=uid)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    hashed_secret_key = bcrypt.hashpw(secret_key, salt)
    new_user_password = models.Pass(esk = hashed_secret_key, hashed_password = hash_password)
    db.add(new_user_password)
    db.commit()
    db.refresh(new_user_password)
    return {"message": "Registration successful"}



class EmailRequest(BaseModel):
    email: str

@router.post("/forgetPass", response_class=JSONResponse)
async def check_user_through_email(email_request: EmailRequest, db: Session = Depends(get_db)):
    email = email_request.email
    user = db.query(models.Users).filter(models.Users.email == email).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found or not active")

    try:
        authen.send_password_reset_email(email)
        return {"message": "Please check your email to reset your password."}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to send password reset email. Please try again later.")



class ResetPasswordRequest(BaseModel):
    oob_code: str
    new_password: str



# ================

def verify_password_reset_code(oob_code: str) -> str:
    try:
        # Verifying the password reset code
        email = authen.verify_password_reset_code(oob_code)
        return email
    except Exception as e:
        raise ValueError(f"Error verifying password reset code: {str(e)}")

def confirm_password_reset(oob_code: str, new_password: str):
    try:
        # Confirming the password reset with the new password
        authen.confirm_password_reset(oob_code, new_password)
    except Exception as e:
        raise ValueError(f"Error confirming password reset: {str(e)}")


# =====================



@router.put("/reset-password")
async def reset_password(request: Request, db: Session = Depends(get_db)):
    try:
        data = await request.json()  # Properly read the JSON body
        oob_code = data.get('oob_code')  # Get the oob_code from the JSON body
        print(oob_code)
        new_password = data.get('new_password')  # Get the new_password from the JSON body
        print(new_password)
        if not oob_code or not new_password:
            raise HTTPException(status_code=400, detail="oob_code and new_password are required.")

        # Verify the password reset code
        email = authen.verify_password_reset_code(oob_code)
        print(email)
        if not email:
            raise HTTPException(status_code=400, detail="Invalid or expired password reset code.")

        # Confirm the password reset
        authen.confirm_password_reset(oob_code, new_password)

        # Fetch user by email
        user_model = db.query(models.Users).filter(models.Users.email == email).first()
        if not user_model:
            raise HTTPException(status_code=404, detail="User not found")

        # Generate new password hash and secret key
        salt = gen_salt()
        hashed_password = get_password_hash(new_password, salt)
        secret_key = gen_secret()

        # Update user model
        user_model.salt = salt
        user_model.secret_key = secret_key
        user_model.is_active = True  # User is now active after password reset

        # Create or update password model
        pass_model = db.query(models.Pass).filter(models.Pass.user_id == user_model.id).first()
        if not pass_model:
            pass_model = models.Pass(user_id=user_model.id)
        
        pass_model.hashed_password = hashed_password
        pass_model.secret_key = secret_key

        db.add(user_model)
        db.add(pass_model)
        db.commit()

        return {"message": "Password has been updated successfully."}


    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")






