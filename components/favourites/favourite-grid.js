import { FavouriteCard } from "./favourite-card.js";

export function FavouriteGrid(movies) {
    if (!document.getElementById("favourite-grid-styles")) {
        const style = document.createElement("style");
        style.id = "favourite-grid-styles";

        style.textContent = `
            .favourite-grid-section {
                width: 100%;
            }

            .favourite-grid-heading {
                margin-bottom: 32px;
            }

            .favourite-grid-eyebrow {
                color: #c084fc;
                font-size: 14px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.2em;
            }

            .favourite-grid-title {
                margin: 8px 0 0;
                color: #fff;
                font-size: 24px;
                font-weight: 700;
            }

            .favourite-grid-count {
                margin: 8px 0 0;
                color: #a3a3a3;
                font-size: 14px;
            }

            .favourite-grid {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 24px;
            }

            .favourite-empty-state {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 64px 24px;
                border-radius: 16px;
                background: rgba(23, 23, 23, 0.4);
                text-align: center;
            }

            .favourite-empty-icon {
                color: #404040;
                font-size: 48px;
            }

            .favourite-empty-title {
                margin: 20px 0 0;
                color: #fff;
                font-size: 20px;
                font-weight: 700;
            }

            .favourite-empty-description {
                max-width: 384px;
                margin: 8px 0 0;
                color: #737373;
                font-size: 14px;
                line-height: 1.6;
            }

            .favourite-explore-link {
                display: inline-block;
                margin-top: 24px;
                padding: 12px 24px;
                border-radius: 999px;
                background: #9333ea;
                color: #fff;
                font-size: 14px;
                font-weight: 600;
                text-decoration: none;
                transition: background-color 0.2s;
            }

            .favourite-explore-link:hover {
                background: #a855f7;
            }

            @media (min-width: 640px) {
                .favourite-grid-title {
                    font-size: 30px;
                }

                .favourite-grid {
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                }
            }

            @media (min-width: 768px) {
                .favourite-grid {
                    grid-template-columns: repeat(4, minmax(0, 1fr));
                }
            }

            @media (min-width: 1024px) {
                .favourite-grid {
                    grid-template-columns: repeat(5, minmax(0, 1fr));
                }
            }

            @media (min-width: 1280px) {
                .favourite-grid {
                    grid-template-columns: repeat(6, minmax(0, 1fr));
                }
            }
        `;

        document.head.appendChild(style);
    }

    const count = movies.length;

    return `
        <section class="favourite-grid-section">
            <div class="favourite-grid-heading">
                <p class="favourite-grid-eyebrow">
                    Your Collection
                </p>

                <h2 class="favourite-grid-title">
                    Movies You Love
                </h2>

                <p class="favourite-grid-count">
                    ${count} ${count === 1 ? "movie" : "movies"} saved to your favourites
                </p>
            </div>

            ${count === 0
            ? `
                        <div class="favourite-empty-state">
                            <div class="favourite-empty-icon">♡</div>

                            <h3 class="favourite-empty-title">
                                No favourites yet
                            </h3>

                            <p class="favourite-empty-description">
                                Start exploring movies and save the ones you love.
                            </p>

                            <a
                                href="./movies.html"
                                class="favourite-explore-link"
                            >
                                Explore Movies
                            </a>
                        </div>
                    `
            : `
                        <div class="favourite-grid">
                            ${movies.map(movie => FavouriteCard(movie)).join("")}
                        </div>
                    `
        }
        </section>
    `;
}