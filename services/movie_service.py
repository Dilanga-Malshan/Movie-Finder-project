import os

from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_ollama import ChatOllama

from models.movie_model import MovieAnalysis
from schemas.movie_responses import MovieAnalysisResponses

load_dotenv()

MODEL_NAME = os.getenv("OLLAMA_MODEL", "llama3.2:latest")

llm = ChatOllama(model=MODEL_NAME, temperature=0.3)


SYSTEM_PROMPT = """
You are an expert film analyst and film studies assistant.
Analyze the movie provided by the user in a useful, educational, and concise way.

Return all requested fields in the structured response format.

Include:
1. Movie title
2. Release year
3. Director
4. Genres
5. A short overview
6. Important themes
7. Interesting topics worth explaining further
8. Similar movies
9. Context movies
10. Deeper questions

Rules:
- Do not recommend movies only because they are popular.
- Similar movies should have meaningful connections in genre, story, themes,
  filmmaking, characters, or ideas.
- Context movies should be older or closely related films that help the user
  understand the requested movie's ideas, filmmaking style, genre, themes,
  or influences.
- For every context movie, explain why it is useful to watch and how it connects.
- Interesting topics should focus on subtle or easily missed aspects that a film
  student could investigate further.
- Deeper questions should encourage critical thinking rather than factual answers.
- If a detail is uncertain, do not invent precise facts.
"""


def analyze_movie(movie: str) -> MovieAnalysisResponses:
    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", SYSTEM_PROMPT),
            ("human", "Analyze this movie:\n\n{movie}"),
        ]
    )

    structured_llm = llm.with_structured_output(MovieAnalysis)
    chain = prompt | structured_llm
    result = chain.invoke({"movie": movie})

    return result
