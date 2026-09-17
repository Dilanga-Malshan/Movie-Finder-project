from fastapi import APIRouter, HTTPException

from schemas.movie_requests import MovieAnalysisRequest
from services.movie_service import analyze_movie

router = APIRouter(prefix="/chats", tags=["Chats"])


@router.post("/", status_code=200)
def movie_analysis(request: MovieAnalysisRequest):
    try:
        return analyze_movie(request.movie.strip())
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Movie analysis failed: {exc}",
        ) from exc
