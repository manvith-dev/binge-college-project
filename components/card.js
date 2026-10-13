
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

export function createMovieCard(movie) {
    const title = escapeHTML(movie.title || movie.name || "Untitled");

    const year = movie.release_date
        ? movie.release_date.substring(0, 4)
        : "Release date unavailable";

    const rating = Number(movie.vote_average)
        ? Number(movie.vote_average).toFixed(1)
        : "N/A";

    const poster = movie.poster_path
        ? `${IMAGE_BASE}${movie.poster_path}`
        : "";

    const card = document.createElement("article");

    card.className = "movie-card";
    card.tabIndex = 0;
    card.setAttribute("role", "link");
    card.setAttribute("aria-label", `View ${title}`);

    card.innerHTML = `
        <div class="movie-card-poster">
            ${poster
            ? `<img src="${poster}" alt="${title} poster" loading="lazy">`
            : `<div class="poster-placeholder">No poster available</div>`
        }

            <span class="movie-card-rating">★ ${rating}</span>
        </div>

        <div class="movie-card-info">
            <h3>${title}</h3>
            <p>${escapeHTML(year)}</p>
        </div>
    `;

    function openMovie() {
        window.location.href =
            `./movie.html?id=${encodeURIComponent(movie.id)}`;
    }

    card.addEventListener("click", openMovie);

    card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openMovie();
        }
    });

    return card;
}

export function renderMovieCards(container, movies) {
    container.replaceChildren();

    if (!movies || movies.length === 0) {
        container.textContent = "No movies found.";
        return;
    }

    movies.forEach(movie => {
        container.appendChild(createMovieCard(movie));
    });
}
