from pydantic import BaseModel, EmailStr
from datetime import datetime


class UserBase(BaseModel):
    email: EmailStr
    nom : str
    prenoms : str


class UserCreate(UserBase):
    hashed_password: str


class UserOut(UserBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(UserOut):
    access_token: str
    token_type: str = "bearer"
