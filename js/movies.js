
import { Navbar } from "../components/navbar.js";
import {
    getPopularMovies,
    searchMovies,
    addFavourite
} from "./api.js";
import { createMovieCard } from "../components/card.js";

const navbar = document.getElementById("navbar");
const grid = document.getElementById("grid");
const status = document.getElementById("status");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const gridTitle = document.getElementById("grid-title");
const loadMoreButton = document.getElementById("load-more");
const hero = document.getElementById("hero");

if (navbar) navbar.innerHTML = Navbar(true);

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

    if (title) title.textContent = movie.title || "Untitled movie";

    if (overview) {
        overview.textContent =
            movie.overview || "No overview available.";
    }

    if (link) {
        link.href = `./movie.html?id=${encodeURIComponent(movie.id)}`;
    }

    if (movie.backdrop_path) {
        const imageUrl =
            `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

        hero.style.backgroundImage =
            `linear-gradient(to top, rgb(10,10,10), rgba(10,10,10,.15)), url("${imageUrl}")`;
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
    wrapper.className = "relative min-w-0";

    wrapper.appendChild(createMovieCard(movie));

    const favouriteButton = document.createElement("button");
    favouriteButton.type = "button";
    favouriteButton.textContent = "♡";
    favouriteButton.title = "Add to favourites";
    favouriteButton.setAttribute(
        "aria-label",
        `Add ${movie.title} to favourites`
    );

    favouriteButton.className =
        "absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-2xl text-white hover:bg-purple-600";

    favouriteButton.addEventListener("click", async event => {
        event.preventDefault();
        event.stopPropagation();

        favouriteButton.disabled = true;

        try {
            await addFavourite(movie);
            favouriteButton.textContent = "♥";
            favouriteButton.classList.add("text-purple-400");
            favouriteButton.title = "Saved to favourites";
        } catch (error) {
            console.error("Saving favourite failed:", error);
            alert("Couldn't save this movie. Check that the backend is running.");
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
    status.className = "py-10 text-center text-neutral-400";
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
        }

        if (reset) {
            gridTitle.textContent = currentQuery
                ? `Search results for "${currentQuery}"`
                : "Popular movies";
        }

        if (movies.length === 0 && reset) {
            status.textContent = "No movies found. Try another search.";
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
        status.className = "py-10 text-center text-red-400";
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
