# AI Movie Finder

A local AI-powered movie analysis web app built with **FastAPI**, **LangChain**, and **Ollama**.

## Features

- Search a movie by title
- AI-generated overview, genres, and themes
- Interesting film-study topics
- Similar movie recommendations
- Context movies with their connection to the requested film
- Critical-thinking questions
- Responsive cinematic web UI
- Runs locally with Ollama; no external AI API key is required

## Requirements

- Python 3.10+
- Ollama installed and running
- An Ollama model such as `llama3.2:latest`

## Setup

### 1. Install dependencies

```bash
python -m venv .venv
```

Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### 2. Pull the Ollama model

```bash
ollama pull llama3.2:latest
```

### 3. Optional environment configuration

Create a `.env` file:

```env
OLLAMA_MODEL=llama3.2:latest
```

`.env` is ignored by Git and should not be committed.

### 4. Start the app

```bash
uvicorn main:app --reload
```

Open `http://127.0.0.1:8000` in your browser.

## API

`POST /chats/`

Request:

```json
{
  "movie": "Interstellar"
}
```

The endpoint returns a structured movie analysis including recommendations and deeper questions.

## Project Structure

```text
AI Movie Finder/
├── main.py
├── models/
│   └── movie_model.py
├── routes/
│   └── movie_routes.py
├── schemas/
│   ├── movie_requests.py
│   └── movie_responses.py
├── services/
│   └── movie_service.py
├── static/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── requirements.txt
└── .gitignore
```

## Notes

The model runs locally through Ollama. AI-generated movie information can contain inaccuracies, so verify details when factual precision matters.
