# app/main.py
from fastapi import FastAPI
from app.api.v1.router import api_router
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[f"http://{os.getenv("REACT_SERVER")}"],  # ton frontend React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")