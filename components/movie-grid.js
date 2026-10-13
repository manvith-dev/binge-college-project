export function MovieGrid(movies) {
    return `
        <style>
            /* Movie Grid Section */
            .movie-grid-section {
                max-width: 1280px;
                margin: 0 auto;
                padding: 64px 24px;
            }

            /* Section Header */
            .movie-grid-header {
                display: flex;
                align-items: flex-end;
                justify-content: space-between;
                margin-bottom: 24px;
            }

            .movie-grid-label {
                color: #c084fc;
                font-size: 14px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.2em;
            }

            .movie-grid-title {
                margin-top: 8px;
                color: #ffffff;
                font-size: 30px;
                font-weight: 700;
            }

            .movie-grid-view-all {
                color: #a3a3a3;
                font-size: 14px;
                font-weight: 500;
                text-decoration: none;
                transition: color 0.2s ease;
            }

            .movie-grid-view-all:hover {
                color: #ffffff;
            }

            /* Horizontal Movie List */
            .movie-grid-list {
                display: flex;
                gap: 20px;
                overflow-x: auto;
                padding-bottom: 16px;
                scrollbar-width: none;
                -ms-overflow-style: none;
            }

            .movie-grid-list::-webkit-scrollbar {
                display: none;
            }

            /* Individual Movie Card */
            .movie-grid-card {
                width: 176px;
                flex: none;
                min-width: 0;
            }

            .movie-grid-poster-container {
                position: relative;
                overflow: hidden;
                border-radius: 16px;
                background-color: #171717;
            }

            .movie-grid-poster-link {
                display: block;
            }

            .movie-grid-poster {
                display: block;
                width: 100%;
                aspect-ratio: 2 / 3;
                object-fit: cover;
                transition: transform 0.3s ease;
            }

            .movie-grid-poster-link:hover .movie-grid-poster {
                transform: scale(1.04);
            }

            /* Favourite Button */
            .add-favourite {
                position: absolute;
                top: 12px;
                right: 12px;
                z-index: 2;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 44px;
                height: 44px;
                padding: 0;
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 50%;
                background-color: rgba(0, 0, 0, 0.85);
                color: #ffffff;
                font-size: 30px;
                line-height: 1;
                cursor: pointer;
                transition:
                    background-color 0.2s ease,
                    color 0.2s ease,
                    transform 0.2s ease;
            }

            .add-favourite:hover {
                background-color: #262626;
                transform: scale(1.08);
            }

            .add-favourite:focus-visible {
                outline: 2px solid #a855f7;
                outline-offset: 3px;
            }

            /* Movie Information */
            .movie-grid-card-title {
                margin-top: 12px;
                overflow: hidden;
                color: #ffffff;
                font-weight: 600;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .movie-grid-card-info {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-top: 4px;
                color: #a3a3a3;
                font-size: 14px;
            }

            .movie-grid-rating {
                color: #facc15;
                white-space: nowrap;
            }

            /* Responsive Styles */
            @media (min-width: 640px) {
                .movie-grid-card {
                    width: 208px;
                }
            }

            @media (max-width: 480px) {
                .movie-grid-section {
                    padding: 48px 16px;
                }

                .movie-grid-title {
                    font-size: 25px;
                }

                .movie-grid-label {
                    font-size: 11px;
                    letter-spacing: 0.15em;
                }

                .movie-grid-card {
                    width: 160px;
                }

                .movie-grid-list {
                    gap: 16px;
                }

                .add-favourite {
                    top: 8px;
                    right: 8px;
                    width: 38px;
                    height: 38px;
                    font-size: 26px;
                }
            }
        </style>

        <section class="movie-grid-section">

            <!-- Section Header -->
            <div class="movie-grid-header">
                <div>
                    <p class="movie-grid-label">
                        What's trending
                    </p>

                    <h2 class="movie-grid-title">
                        Popular Movies
                    </h2>
                </div>

                <a
                    href="./pages/movies.html"
                    class="movie-grid-view-all"
                >
                    View all →
                </a>
            </div>

            <!-- Horizontal Movie List -->
            <div class="movie-grid-list">

                ${movies.map(movie => `
                    <div class="movie-grid-card">

                        <!-- Movie Poster -->
                        <div class="movie-grid-poster-container">

                            <a
                                href="./pages/movie.html?id=${movie.id}"
                                class="movie-grid-poster-link"
                            >
                                <img
                                    src="https://image.tmdb.org/t/p/w342${movie.poster_path}"
                                    alt="${movie.title}"
                                    class="movie-grid-poster"
                                    loading="lazy"
                                />
                            </a>

                            <!-- Favourite Button -->
                            <button
                                type="button"
                                class="add-favourite"
                                data-id="${movie.id}"
                                aria-label="Add ${movie.title} to favourites"
                                title="Add to favourites"
                            >
                                ♡
                            </button>

                        </div>

                        <!-- Movie Title -->
                        <h3 class="movie-grid-card-title" title="${movie.title}">
                            ${movie.title}
                        </h3>

                        <!-- Movie Information -->
                        <div class="movie-grid-card-info">
                            <span>
                                ${movie.release_date?.slice(0, 4) || "N/A"}
                            </span>

                            <span>•</span>

                            <span class="movie-grid-rating">
                                ★ ${movie.vote_average?.toFixed(1) ?? "N/A"}
                            </span>
                        </div>

                    </div>
                `).join("")}

            </div>
        </section>
    `;
}