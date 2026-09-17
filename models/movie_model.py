from pydantic import BaseModel


class RecommendedMovie(BaseModel):
    title: str
    year: str
    director: str
    connection: str


class MovieAnalysis(BaseModel):
    title: str
    year: str
    director: str
    genres: list[str]
    overview: str
    themes: list[str]
    interesting_topic: str
    similar_movies: list[RecommendedMovie]
    context_movie: list[RecommendedMovie]
    deeper_questions: list[str]
