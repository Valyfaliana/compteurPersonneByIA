from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class EventBase(BaseModel):
    event_type: str
    confidence: Optional[float] = None


class EventCreate(EventBase):
    pass


class EventRead(EventBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class EventUpdate(EventBase):
    pass


class EventOut(EventBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
