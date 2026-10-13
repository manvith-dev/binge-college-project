import { Navbar } from "../components/navbar.js";
import {
    getPopularMovies,
    searchMovies,
    addFavourite
} from "./api.js";
import { createMovieCard } from "../components/card.js";

// ---------------- INTERNAL CSS ----------------

if (!document.getElementById("movies-page-styles")) {
    const style = document.createElement("style");
    style.id = "movies-page-styles";

    style.textContent = `
        .hidden {
            display: none !important;
        }

        /* Movie card wrapper */
        .movie-card-wrapper {
            position: relative;
            min-width: 0;
        }

        /* Favourite button */
        .favourite-button {
            position: absolute;
            top: 8px;
            right: 8px;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            padding: 0;
            border: none;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.8);
            color: #ffffff;
            font-size: 24px;
            line-height: 1;
            cursor: pointer;
            transition:
                background-color 0.2s ease,
                color 0.2s ease,
                transform 0.2s ease;
        }

        .favourite-button:hover {
            background-color: #9333ea;
        }

        .favourite-button:active {
            transform: scale(0.94);
        }

        .favourite-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .favourite-button.is-favourite {
            color: #c084fc;
        }

        .favourite-button:focus-visible {
            outline: 2px solid #a855f7;
            outline-offset: 3px;
        }

        /* Loading and error messages */
        .movie-status {
            padding: 40px 0;
            color: #a3a3a3;
            text-align: center;
        }

        .movie-status-error {
            color: #f87171;
        }

        /* Hero carousel transition */
        #hero {
            transition: opacity 0.35s ease;
        }

        #hero.hero-changing {
            opacity: 0.25;
        }

        @media (prefers-reduced-motion: reduce) {
            #hero,
            .favourite-button {
                transition: none;
            }
        }
    `;

    document.head.appendChild(style);
}

// ---------------- DOM ELEMENTS ----------------

const navbar = document.getElementById("navbar");
const grid = document.getElementById("grid");
const status = document.getElementById("status");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const gridTitle = document.getElementById("grid-title");
const loadMoreButton = document.getElementById("load-more");
const hero = document.getElementById("hero");

if (navbar) navbar.innerHTML = Navbar(true);

// ---------------- STATE ----------------

let currentPage = 1;
let totalPages = 1;
let currentQuery = "";
let isLoading = false;

let heroMovies = [];
let heroIndex = 0;
let heroTimer = null;
let heroTransitionTimer = null;

// ---------------- HERO CAROUSEL ----------------

function updateHero(movie) {
    if (!movie || !hero) return;

    const title = document.getElementById("hero-title");
    const overview = document.getElementById("hero-overview");
    const link = document.getElementById("hero-link");

    if (title) {
        title.textContent = movie.title || "Untitled movie";
    }

    if (overview) {
        overview.textContent =
            movie.overview || "No overview available.";
    }

    if (link) {
        link.href =
            `./movie.html?id=${encodeURIComponent(movie.id)}`;
    }

    if (movie.backdrop_path) {
        const imageUrl =
            `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

        hero.style.backgroundImage = `
            linear-gradient(
                to top,
                rgb(10, 10, 10),
                rgba(10, 10, 10, 0.15)
            ),
            url("${imageUrl}")
        `;
    }

    hero.style.backgroundSize = "100% auto";
    hero.style.backgroundPosition = "center center";
    hero.style.backgroundRepeat = "no-repeat";
}

function startHeroCarousel(movies) {
    heroMovies = movies.filter(movie => movie.backdrop_path);

    clearInterval(heroTimer);
    clearTimeout(heroTransitionTimer);

    if (heroMovies.length === 0) return;

    heroIndex = 0;
    updateHero(heroMovies[heroIndex]);

    // Don't animate if there is only one movie.
    if (heroMovies.length < 2) return;

    heroTimer = setInterval(() => {
        hero.classList.add("hero-changing");

        heroTransitionTimer = setTimeout(() => {
            heroIndex = (heroIndex + 1) % heroMovies.length;

            updateHero(heroMovies[heroIndex]);
            hero.classList.remove("hero-changing");
        }, 350);
    }, 5000);
}

// ---------------- MOVIE CARDS ----------------

function createCardWithFavourite(movie) {
    const wrapper = document.createElement("div");
    wrapper.className = "movie-card-wrapper";

    wrapper.appendChild(createMovieCard(movie));

    const favouriteButton = document.createElement("button");

    favouriteButton.type = "button";
    favouriteButton.textContent = "♡";
    favouriteButton.title = "Add to favourites";
    favouriteButton.className = "favourite-button";

    favouriteButton.setAttribute(
        "aria-label",
        `Add ${movie.title || movie.name || "movie"} to favourites`
    );

    favouriteButton.addEventListener("click", async event => {
        event.preventDefault();
        event.stopPropagation();

        favouriteButton.disabled = true;

        try {
            await addFavourite(movie);

            favouriteButton.textContent = "♥";
            favouriteButton.classList.add("is-favourite");
            favouriteButton.title = "Saved to favourites";
            favouriteButton.setAttribute(
                "aria-label",
                `${movie.title || movie.name || "Movie"} saved to favourites`
            );
        } catch (error) {
            console.error("Saving favourite failed:", error);

            alert(
                "Couldn't save this movie. Check that the backend is running."
            );
        } finally {
            favouriteButton.disabled = false;
        }
    });

    wrapper.appendChild(favouriteButton);

    return wrapper;
}

// ---------------- LOAD MOVIES ----------------

async function loadMovies({ reset = false } = {}) {
    if (isLoading) return;

    isLoading = true;

    if (reset) {
        currentPage = 1;
        grid.replaceChildren();
    }

    status.textContent = "Loading movies…";
    status.className = "movie-status";

    loadMoreButton.classList.add("hidden");

    try {
        const data = currentQuery
            ? await searchMovies(currentQuery, currentPage)
            : await getPopularMovies(currentPage);

        const movies = data.results || [];
        totalPages = Math.min(data.total_pages || 1, 500);

        // Update the hero only for the normal popular-movies view.
        if (reset && !currentQuery && movies.length > 0) {
            hero.classList.remove("hidden");
            startHeroCarousel(movies);
        }

        if (currentQuery) {
            hero.classList.add("hidden");
            clearInterval(heroTimer);
            clearTimeout(heroTransitionTimer);
        }

        if (reset) {
            gridTitle.textContent = currentQuery
                ? `Search results for "${currentQuery}"`
                : "Popular movies";
        }

        if (movies.length === 0 && reset) {
            status.textContent =
                "No movies found. Try another search.";
        } else {
            movies.forEach(movie => {
                grid.appendChild(createCardWithFavourite(movie));
            });

            status.textContent = "";
        }

        if (currentPage < totalPages && movies.length > 0) {
            loadMoreButton.classList.remove("hidden");
        }
    } catch (error) {
        console.error("Loading movies failed:", error);

        status.textContent =
            "Couldn't load movies. Check the backend and try again.";

        status.className = "movie-status movie-status-error";
    } finally {
        isLoading = false;
    }
}

// ---------------- SEARCH ----------------

searchForm.addEventListener("submit", async event => {
    event.preventDefault();

    currentQuery = searchInput.value.trim();

    await loadMovies({ reset: true });
});

// ---------------- PAGINATION ----------------

loadMoreButton.addEventListener("click", async () => {
    if (currentPage >= totalPages || isLoading) return;

    currentPage++;

    await loadMovies();
});

// ---------------- START ----------------

loadMovies({ reset: true });