
import { Navbar } from "../components/navbar.js";
import { getMovieDetails, addFavourite } from "./api.js";

const navbar = document.getElementById("navbar");
const container = document.getElementById("movie");

if (navbar) navbar.innerHTML = Navbar(true);

function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

function formatMoney(amount) {
    if (!amount || amount <= 0) return "Not available";
    return "$" + Number(amount).toLocaleString("en-US");
}

function formatRuntime(minutes) {
    if (!minutes) return "Not available";
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours
        ? `${hours}h ${remainingMinutes}m`
        : `${remainingMinutes}m`;
}

async function loadMovie() {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get("id");

    if (!movieId || !/^\d+$/.test(movieId)) {
        container.innerHTML = `
            <div class="mx-auto max-w-3xl px-6 py-32 text-center">
                <h1 class="text-3xl font-bold">Movie not found</h1>
                <p class="mt-3 text-neutral-400">
                    Open a movie from the Movies page to see its details.
                </p>
                <a href="./movies.html"
                   class="mt-6 inline-block rounded-full bg-purple-600 px-6 py-3 font-semibold">
                    Browse movies
                </a>
            </div>
        `;
        return;
    }

    try {
        const movie = await getMovieDetails(movieId);

        const title = escapeHTML(movie.title || "Untitled movie");
        const overview = escapeHTML(movie.overview || "No overview is available.");
        const poster = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "";
        const backdrop = movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
            : "";
        const genres = (movie.genres || [])
            .map(genre => escapeHTML(genre.name))
            .join(" · ") || "Genres unavailable";
        const rating = Number(movie.vote_average)
            ? Number(movie.vote_average).toFixed(1) + "/10"
            : "Not rated";
        const releaseDate = escapeHTML(movie.release_date || "Not available");
        const originalTitle = escapeHTML(movie.original_title || movie.title || "");
        const language = escapeHTML((movie.original_language || "N/A").toUpperCase());

        document.title = `${movie.title || "Movie"} | Binge`;

        container.innerHTML = `
            <section class="relative overflow-hidden">
                ${backdrop ? `
                    <div class="absolute inset-0 bg-cover bg-center opacity-25"
                         style="background-image:url('${backdrop}')"></div>
                ` : ""}

                <div class="absolute inset-0 bg-gradient-to-b from-neutral-950/50 via-neutral-950/80 to-neutral-950"></div>

                <div class="relative mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-[280px_1fr] md:py-20">
                    <div>
                        ${poster ? `
                            <img src="${poster}" alt="${title} poster"
                                 class="mx-auto w-full max-w-[280px] rounded-2xl shadow-2xl"
                                 onerror="this.style.display='none'">
                        ` : `
                            <div class="flex aspect-[2/3] items-center justify-center rounded-2xl bg-neutral-800 text-neutral-400">
                                No poster available
                            </div>
                        `}
                    </div>

                    <div class="self-center">
                        <a href="./movies.html"
                           class="mb-6 inline-block text-sm text-purple-300 hover:text-white">
                            ← Back to movies
                        </a>

                        <h1 class="text-3xl font-black sm:text-5xl">${title}</h1>

                        <p class="mt-3 text-sm text-neutral-300">${genres}</p>

                        <div class="mt-5 flex flex-wrap gap-3 text-sm">
                            <span class="rounded-full bg-yellow-500/15 px-4 py-2 text-yellow-300">
                                ★ ${rating}
                            </span>
                            <span class="rounded-full bg-white/10 px-4 py-2">
                                ${releaseDate}
                            </span>
                            <span class="rounded-full bg-white/10 px-4 py-2">
                                ${formatRuntime(movie.runtime)}
                            </span>
                        </div>

                        <h2 class="mt-8 text-xl font-bold">Overview</h2>
                        <p class="mt-3 max-w-3xl leading-7 text-neutral-300">${overview}</p>

                        <button id="save-favourite"
                                class="mt-7 rounded-full bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-500 disabled:opacity-50">
                            ♡ Add to favourites
                        </button>

                        <div class="mt-10 grid gap-5 sm:grid-cols-2">
                            <div>
                                <p class="text-sm text-neutral-500">Original title</p>
                                <p class="mt-1 font-medium">${originalTitle}</p>
                            </div>
                            <div>
                                <p class="text-sm text-neutral-500">Original language</p>
                                <p class="mt-1 font-medium">${language}</p>
                            </div>
                            <div>
                                <p class="text-sm text-neutral-500">Budget</p>
                                <p class="mt-1 font-medium">${formatMoney(movie.budget)}</p>
                            </div>
                            <div>
                                <p class="text-sm text-neutral-500">Revenue</p>
                                <p class="mt-1 font-medium">${formatMoney(movie.revenue)}</p>
                            </div>
                        </div>

                        <p id="favourite-status" class="mt-4 text-sm text-neutral-400"></p>
                    </div>
                </div>
            </section>
        `;

        const favouriteButton = document.getElementById("save-favourite");
        const favouriteStatus = document.getElementById("favourite-status");

        favouriteButton.addEventListener("click", async () => {
            favouriteButton.disabled = true;
            favouriteStatus.textContent = "Saving…";

            try {
                await addFavourite(movie);
                favouriteButton.textContent = "♥ Saved to favourites";
                favouriteStatus.textContent = "This movie has been saved.";
                favouriteButton.classList.add("bg-neutral-700");
            } catch (error) {
                console.error("Saving favourite failed:", error);
                favouriteStatus.textContent =
                    "Couldn't save this movie. Check that the backend is running.";
            } finally {
                favouriteButton.disabled = false;
            }
        });
    } catch (error) {
        console.error("Loading movie details failed:", error);

        container.innerHTML = `
            <div class="mx-auto max-w-3xl px-6 py-32 text-center">
                <h1 class="text-3xl font-bold">Couldn't load this movie</h1>
                <p class="mt-3 text-neutral-400">
                    Check that the backend is running and the movie API request succeeds.
                </p>
                <a href="./movies.html"
                   class="mt-6 inline-block rounded-full bg-purple-600 px-6 py-3 font-semibold">
                    Back to movies
                </a>
            </div>
        `;
    }
}

loadMovie();
