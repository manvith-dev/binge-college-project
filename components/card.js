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
        <style>
            .movie-card {
                overflow: hidden;
                border: 1px solid #262626;
                border-radius: 12px;
                background-color: #171717;
                cursor: pointer;
                transition:
                    transform 0.25s ease,
                    border-color 0.25s ease,
                    box-shadow 0.25s ease;
            }

            .movie-card:hover {
                transform: translateY(-4px);
                border-color: #525252;
                box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
            }

            .movie-card:focus-visible {
                outline: 2px solid #a855f7;
                outline-offset: 3px;
            }

            .movie-card-poster {
                position: relative;
                overflow: hidden;
                aspect-ratio: 2 / 3;
                background-color: #262626;
            }

            .movie-card-poster img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s ease;
            }

            .movie-card:hover .movie-card-poster img {
                transform: scale(1.04);
            }

            .poster-placeholder {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                padding: 16px;
                color: #a3a3a3;
                font-size: 14px;
                text-align: center;
            }

            .movie-card-rating {
                position: absolute;
                top: 10px;
                right: 10px;
                display: flex;
                align-items: center;
                gap: 4px;
                padding: 6px 9px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 6px;
                background-color: rgba(10, 10, 10, 0.85);
                color: #facc15;
                font-size: 13px;
                font-weight: 600;
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
            }

            .movie-card-info {
                padding: 14px;
            }

            .movie-card-info h3 {
                overflow: hidden;
                color: #ffffff;
                font-size: 15px;
                font-weight: 600;
                line-height: 1.5;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .movie-card-info p {
                margin-top: 6px;
                color: #a3a3a3;
                font-size: 13px;
            }

            @media (max-width: 480px) {
                .movie-card-info {
                    padding: 10px;
                }

                .movie-card-info h3 {
                    font-size: 14px;
                }

                .movie-card-rating {
                    top: 6px;
                    right: 6px;
                    padding: 5px 7px;
                    font-size: 12px;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                .movie-card,
                .movie-card-poster img {
                    transition: none;
                }

                .movie-card:hover,
                .movie-card:hover .movie-card-poster img {
                    transform: none;
                }
            }
        </style>

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