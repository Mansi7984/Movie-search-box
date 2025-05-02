if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}

const movieContainer = document.getElementById("movieContainer");

async function searchMovies() {
const query = document.getElementById("searchInput").value.trim();
if (query.length === 0) {
  movieContainer.innerHTML = "";
  return;
}

const response = await fetch(`https://www.omdbapi.com/?s=${query}&page=1&apikey=fc1fef96`);
const data = await response.json();

if (data.Response === "True") {
  const movieCards = data.Search.map(movie => `
    <div class="movie-card">
      <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
    
      <button onclick="loadMovieDetails('${movie.imdbID}')">More Info</button>
    </div>
  `).join("");
  movieContainer.innerHTML = movieCards;
} else {
  movieContainer.innerHTML = "<p>No movies found.</p>";
}
}

function loadMovieDetails(imdbID) {
// Redirect to the detail page with the movie's imdbID
window.location.href = `page.html?id=${imdbID}`;
}