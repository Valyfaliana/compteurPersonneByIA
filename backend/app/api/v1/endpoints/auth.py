from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.schemas.users import UserCreate, UserOut, LoginRequest, LoginResponse
from app.models.users import User
from app.core.security import get_password_hash, verify_password
from app import database

database.Base.metadata.create_all(bind=database.engine)

router = APIRouter()


@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register_user(user: UserCreate, db: Session = Depends(database.get_db)):
    # Vérifier si l'email existe déjà
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Un utilisateur avec cet email existe déjà.",
        )

    # Créer nouvel utilisateur
    new_user = User(
        nom=user.nom,
        prenoms=user.prenoms,
        email=user.email,
        hashed_password=get_password_hash(user.hashed_password[:72]),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.post("/login", response_model=LoginResponse)
def login_user(credentials: LoginRequest, db: Session = Depends(database.get_db)):
    # Vérifier si l'utilisateur existe
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect.",
        )
    
    # Vérifier le mot de passe
    if not verify_password(credentials.password, user.hashed_password): # type: ignore
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect.",
        )
    
    # Générer un token (exemple simple - à améliorer avec JWT)
    access_token = f"token_{user.id}_{user.email}"
    
    return LoginResponse(
        id=user.id, # type: ignore
        email=user.email, # type: ignore
        nom=user.nom, # type: ignore
        prenoms=user.prenoms, # type: ignore
        created_at=user.created_at, # type: ignore
        access_token=access_token,
        token_type="bearer",
    )
