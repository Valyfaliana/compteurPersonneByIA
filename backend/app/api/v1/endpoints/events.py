from fastapi import APIRouter, Depends, HTTPException
from app.crud import events as event_crud
from app.models import events as event_model
from app.schemas import events as event_schemas
from sqlalchemy.orm import Session
from app import database


event_model.Base.metadata.create_all(bind=database.engine)

router = APIRouter()


@router.post("/", response_model=event_schemas.EventOut)
def create_event(
    event: event_schemas.EventCreate, db: Session = Depends(database.get_db)
):
    return event_crud.create_event(db, event)


@router.get("/", response_model=list[event_schemas.EventOut])
def read_events(
    skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)
):
    return event_crud.get_events(db, skip=skip, limit=limit)


@router.get("/{event_id}", response_model=event_schemas.EventOut)
def read_event(event_id: int, db: Session = Depends(database.get_db)):
    db_event = event_crud.get_event(db, event_id)
    if db_event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return db_event


@router.put("/{event_id}", response_model=event_schemas.EventOut)
def update_event(
    event_id: int,
    event: event_schemas.EventUpdate,
    db: Session = Depends(database.get_db),
):
    db_event = event_crud.update_event(db, event_id, event)
    if db_event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return db_event


@router.delete("/{event_id}", response_model=event_schemas.EventOut)
def delete_event(event_id: int, db: Session = Depends(database.get_db)):
    db_event = event_crud.delete_event(db, event_id)
    if db_event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return db_event
