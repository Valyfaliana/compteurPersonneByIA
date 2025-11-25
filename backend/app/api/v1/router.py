from fastapi import APIRouter
from .endpoints import events, auth

api_router = APIRouter()

api_router.include_router(events.router, prefix="/events", tags=["Events"])
api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])