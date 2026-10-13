export function FavouriteCard(movie) {
    if (!document.getElementById("favourite-card-styles")) {
        const style = document.createElement("style");
        style.id = "favourite-card-styles";

        style.textContent = `
            .favourite-card {
                min-width: 0;
                overflow: hidden;
                padding: 12px;
                border: 1px solid #262626;
                border-radius: 16px;
                background: rgba(23, 23, 23, 0.4);
                transition: border-color 0.3s;
            }

            .favourite-card:hover {
                border-color: rgba(168, 85, 247, 0.5);
            }

            .favourite-card-link {
                display: block;
            }

            .favourite-card-poster {
                overflow: hidden;
                border-radius: 12px;
                background: #171717;
            }

            .favourite-card-poster img {
                display: block;
                width: 100%;
                aspect-ratio: 2 / 3;
                object-fit: cover;
                border-radius: 12px;
                transition: transform 0.3s;
            }

            .favourite-card:hover .favourite-card-poster img {
                transform: scale(1.05);
            }

            .favourite-card-details {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                gap: 8px;
                margin-top: 12px;
            }

            .favourite-card-title {
                min-width: 0;
                flex: 1;
                padding: 0 4px;
                color: #fff;
                font-size: 14px;
                font-weight: 600;
                line-height: 20px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                overflow: hidden;
                overflow-wrap: anywhere;
                transition: color 0.3s;
            }

            .favourite-card:hover .favourite-card-title {
                color: #d8b4fe;
            }

            .remove-favourite {
                display: flex;
                width: 36px;
                height: 36px;
                flex-shrink: 0;
                align-items: center;
                justify-content: center;
                border: none;
                border-radius: 50%;
                background: transparent;
                color: #c084fc;
                font-size: 18px;
                cursor: pointer;
                transition: background-color 0.2s, color 0.2s;
            }

            .remove-favourite:hover {
                background: rgba(239, 68, 68, 0.1);
                color: #f87171;
            }

            .remove-favourite:disabled {
                cursor: not-allowed;
            }

            @media (min-width: 640px) {
                .favourite-card-title {
                    font-size: 16px;
                }
            }
        `;

        document.head.appendChild(style);
    }

    const movieId = encodeURIComponent(movie.movie_id);
    const title = escapeHTML(movie.title ?? "Untitled");
    const posterPath = movie.poster_path
        ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
        : "";

    return `
        <article class="favourite-card">
            <a href="./movie.html?id=${movieId}" class="favourite-card-link">
                <div class="favourite-card-poster">
                    <img
                        src="${escapeHTML(posterPath)}"
                        alt="${title}"
                        loading="lazy"
                    />
                </div>
            </a>

            <div class="favourite-card-details">
                <h3 class="favourite-card-title">${title}</h3>

                <button
                    class="remove-favourite"
                    data-id="${escapeHTML(String(movie.movie_id))}"
                    title="Remove from favourites"
                    aria-label="Remove ${title} from favourites"
                >
                    ♥
                </button>
            </div>
        </article>
    `;
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}