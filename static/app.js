const form = document.getElementById("movie-form");
const input = document.getElementById("movie-input");
const button = document.getElementById("analyze-btn");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");
const errorMessage = document.getElementById("error-message");
const result = document.getElementById("result");

const $ = (id) => document.getElementById(id);

function escapeHtml(value = "") {
  return String(value).replace(/[&<>\"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
  }[char]));
}

function setLoading(isLoading) {
  loading.classList.toggle("hidden", !isLoading);
  button.disabled = isLoading;
  button.querySelector("span:first-child").textContent = isLoading ? "Analyzing..." : "Analyze";
}

function showError(message) {
  errorMessage.textContent = message;
  errorBox.classList.remove("hidden");
  result.classList.add("hidden");
}

function renderMovies(items = []) {
  if (!items.length) return '<div class="movie-card"><p>No recommendations returned.</p></div>';
  return items.map((movie) => `
    <article class="movie-card">
      <div class="movie-meta">${escapeHtml(movie.year || "Year unknown")} · ${escapeHtml(movie.director || "Director unknown")}</div>
      <h4>${escapeHtml(movie.title)}</h4>
      <p>${escapeHtml(movie.connection || "")}</p>
    </article>
  `).join("");
}

function renderAnalysis(data) {
  $("movie-title").textContent = data.title || "Unknown movie";
  $("movie-meta").textContent = `${data.year || "Year unknown"} · Directed by ${data.director || "Unknown"}`;
  $("overview").textContent = data.overview || "No overview returned.";
  $("genres").innerHTML = (data.genres || []).map((genre) => `<span class="chip">${escapeHtml(genre)}</span>`).join("");
  $("themes").innerHTML = (data.themes || []).map((theme) => `<div class="theme">${escapeHtml(theme)}</div>`).join("");
  $("interesting-topic").textContent = data.interesting_topic || "No topic returned.";
  $("similar-movies").innerHTML = renderMovies(data.similar_movies);
  $("context-movies").innerHTML = renderMovies(data.context_movie);
  $("questions").innerHTML = (data.deeper_questions || []).map((question) => `<li>${escapeHtml(question)}</li>`).join("");

  result.classList.remove("hidden");
  result.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function analyzeMovie(movie) {
  const trimmed = movie.trim();
  if (!trimmed) return;

  errorBox.classList.add("hidden");
  result.classList.add("hidden");
  setLoading(true);

  try {
    const response = await fetch("/chats/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movie: trimmed }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "The API returned an error.");
    renderAnalysis(data);
  } catch (error) {
    showError(error.message || "Unable to analyze the movie.");
  } finally {
    setLoading(false);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  analyzeMovie(input.value);
});

document.querySelectorAll(".example").forEach((example) => {
  example.addEventListener("click", () => {
    input.value = example.dataset.movie;
    analyzeMovie(input.value);
  });
});

$("new-analysis").addEventListener("click", () => {
  result.classList.add("hidden");
  input.focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
