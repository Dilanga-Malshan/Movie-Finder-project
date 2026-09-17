from pydantic import BaseModel, Field


class MovieAnalysisRequest(BaseModel):
    movie: str = Field(..., min_length=1, description="Movie title to analyze")
