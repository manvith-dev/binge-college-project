import { Navbar } from "../components/navbar.js";
import { getMovieDetails, addFavourite } from "./api.js";

const navbar = document.getElementById("navbar");
const container = document.getElementById("movie");

if (navbar) navbar.innerHTML = Navbar(true);

if (!document.getElementById("movie-page-styles")) {
    const style = document.createElement("style");
    style.id = "movie-page-styles";

    style.textContent = `
        .movie-page {
            position: relative;
            isolation: isolate;
            min-height: 100vh;
            overflow: hidden;
            background: #0a0a0a;
            color: #fff;
        }

        .movie-backdrop {
            position: absolute;
            z-index: -1;
            top: 0;
            right: 0;
            left: 0;
            height: 420px;
            background-position: center;
            background-size: cover;
            opacity: 0.3;
            pointer-events: none;
        }

        .movie-backdrop-fade {
            position: absolute;
            z-index: -1;
            top: 0;
            right: 0;
            left: 0;
            height: 420px;
            background: linear-gradient(
                to bottom,
                rgba(10, 10, 10, 0.4),
                rgba(10, 10, 10, 0.7) 45%,
                #0a0a0a 100%
            );
            pointer-events: none;
        }

        .movie-content {
            position: relative;
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            gap: 32px;
            width: 100%;
            max-width: 1152px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        .movie-poster-column {
            width: 100%;
        }

        .movie-poster {
            display: block;
            width: 100%;
            max-width: 240px;
            margin: 0 auto;
            border-radius: 16px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .movie-poster-placeholder {
            display: flex;
            align-items: center;
            justify-content: center;
            aspect-ratio: 2 / 3;
            width: 100%;
            max-width: 240px;
            margin: 0 auto;
            border-radius: 16px;
            background: #262626;
            color: #a3a3a3;
            text-align: center;
        }

        .movie-information {
            min-width: 0;
            align-self: center;
        }

        .movie-back-link {
            display: inline-block;
            margin-bottom: 24px;
            color: #d8b4fe;
            font-size: 14px;
            text-decoration: none;
            transition: color 0.2s;
        }

        .movie-back-link:hover {
            color: #fff;
        }

        .movie-title {
            margin: 0;
            overflow-wrap: anywhere;
            font-size: 30px;
            font-weight: 900;
            letter-spacing: -0.025em;
        }

        .movie-genres {
            margin: 12px 0 0;
            color: #d4d4d4;
            font-size: 14px;
            line-height: 24px;
        }

        .movie-metadata {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 20px;
            font-size: 14px;
        }

        .movie-metadata-item {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.1);
        }

        .movie-rating {
            background: rgba(234, 179, 8, 0.15);
            color: #fde047;
        }

        .movie-overview-title {
            margin: 32px 0 0;
            font-size: 20px;
            font-weight: 700;
        }

        .movie-overview {
            max-width: 768px;
            margin: 12px 0 0;
            color: #d4d4d4;
            font-size: 14px;
            line-height: 28px;
            white-space: pre-line;
        }

        .movie-favourite-button {
            margin-top: 28px;
            padding: 12px 24px;
            border: none;
            border-radius: 999px;
            background: #9333ea;
            color: #fff;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s, opacity 0.2s;
        }

        .movie-favourite-button:hover:not(:disabled) {
            background: #a855f7;
        }

        .movie-favourite-button:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .movie-favourite-button.is-saved {
            background: #404040;
        }

        .movie-additional-info {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            gap: 24px 32px;
            margin-top: 40px;
        }

        .movie-info-label {
            margin: 0;
            color: #737373;
            font-size: 14px;
        }

        .movie-info-value {
            margin: 4px 0 0;
            overflow-wrap: anywhere;
            font-weight: 500;
        }

        .movie-favourite-status {
            margin-top: 16px;
            color: #a3a3a3;
            font-size: 14px;
        }

        .movie-message {
            max-width: 768px;
            margin: 0 auto;
            padding: 128px 24px;
            color: #fff;
            text-align: center;
        }

        .movie-message h1 {
            margin: 0;
            font-size: 30px;
            font-weight: 700;
        }

        .movie-message p {
            margin-top: 12px;
            color: #a3a3a3;
        }

        .movie-message-link {
            display: inline-block;
            margin-top: 24px;
            padding: 12px 24px;
            border-radius: 999px;
            background: #9333ea;
            color: #fff;
            font-weight: 600;
            text-decoration: none;
            transition: background-color 0.2s;
        }

        .movie-message-link:hover {
            background: #a855f7;
        }

        @media (min-width: 640px) {
            .movie-backdrop,
            .movie-backdrop-fade {
                height: 500px;
            }

            .movie-content {
                padding: 56px 32px;
            }

            .movie-poster {
                max-width: 280px;
            }

            .movie-poster-placeholder {
                max-width: 280px;
            }

            .movie-title {
                font-size: 36px;
            }

            .movie-overview {
                font-size: 16px;
            }

            .movie-additional-info {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }

        @media (min-width: 768px) {
            .movie-content {
                grid-template-columns: 240px minmax(0, 1fr);
                gap: 40px;
                padding-top: 80px;
                padding-bottom: 80px;
            }
        }

        @media (min-width: 1024px) {
            .movie-content {
                grid-template-columns: 280px minmax(0, 1fr);
                gap: 48px;
            }

            .movie-title {
                font-size: 48px;
            }
        }
    `;

    document.head.appendChild(style);
}

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

function renderMessage(title, message, linkText = "Browse movies") {
    return `
        <div class="movie-message">
            <h1>${escapeHTML(title)}</h1>
            <p>${escapeHTML(message)}</p>
            <a href="./movies.html" class="movie-message-link">
                ${escapeHTML(linkText)}
            </a>
        </div>
    `;
}

async function loadMovie() {
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const movieId = params.get("id");

    if (!movieId || !/^\d+$/.test(movieId)) {
        container.innerHTML = renderMessage(
            "Movie not found",
            "Open a movie from the Movies page to see its details.",
            "Browse movies"
        );
        return;
    }

    try {
        const movie = await getMovieDetails(movieId);

        const title = escapeHTML(movie.title || "Untitled movie");
        const overview = escapeHTML(
            movie.overview || "No overview is available."
        );

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

        const releaseDate = escapeHTML(
            movie.release_date || "Not available"
        );

        const originalTitle = escapeHTML(
            movie.original_title || movie.title || ""
        );

        const language = escapeHTML(
            (movie.original_language || "N/A").toUpperCase()
        );

        document.title = `${movie.title || "Movie"} | Binge`;

        container.innerHTML = `
            <section class="movie-page">

                ${backdrop ? `
                    <div
                        class="movie-backdrop"
                        style="background-image: url('${escapeHTML(backdrop)}')"
                        aria-hidden="true"
                    ></div>
                ` : ""}

                <div class="movie-backdrop-fade" aria-hidden="true"></div>

                <div class="movie-content">

                    <div class="movie-poster-column">
                        ${poster ? `
                            <img
                                src="${escapeHTML(poster)}"
                                alt="${title} poster"
                                class="movie-poster"
                                onerror="this.style.display='none'"
                            >
                        ` : `
                            <div class="movie-poster-placeholder">
                                No poster available
                            </div>
                        `}
                    </div>

                    <div class="movie-information">

                        <a href="./movies.html" class="movie-back-link">
                            ← Back to movies
                        </a>

                        <h1 class="movie-title">${title}</h1>

                        <p class="movie-genres">${genres}</p>

                        <div class="movie-metadata">
                            <span class="movie-metadata-item movie-rating">
                                ★ ${rating}
                            </span>

                            <span class="movie-metadata-item">
                                ${releaseDate}
                            </span>

                            <span class="movie-metadata-item">
                                ${formatRuntime(movie.runtime)}
                            </span>
                        </div>

                        <h2 class="movie-overview-title">Overview</h2>

                        <p class="movie-overview">${overview}</p>

                        <button
                            id="save-favourite"
                            type="button"
                            class="movie-favourite-button"
                        >
                            ♡ Add to favourites
                        </button>

                        <div class="movie-additional-info">
                            <div>
                                <p class="movie-info-label">Original title</p>
                                <p class="movie-info-value">${originalTitle}</p>
                            </div>

                            <div>
                                <p class="movie-info-label">Original language</p>
                                <p class="movie-info-value">${language}</p>
                            </div>

                            <div>
                                <p class="movie-info-label">Budget</p>
                                <p class="movie-info-value">
                                    ${formatMoney(movie.budget)}
                                </p>
                            </div>

                            <div>
                                <p class="movie-info-label">Revenue</p>
                                <p class="movie-info-value">
                                    ${formatMoney(movie.revenue)}
                                </p>
                            </div>
                        </div>

                        <p
                            id="favourite-status"
                            class="movie-favourite-status"
                            role="status"
                            aria-live="polite"
                        ></p>

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
                favouriteButton.classList.add("is-saved");
                favouriteStatus.textContent = "This movie has been saved.";
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

        container.innerHTML = renderMessage(
            "Couldn't load this movie",
            "Check that the backend is running and the movie API request succeeds.",
            "Back to movies"
        );
    }
}

loadMovie();