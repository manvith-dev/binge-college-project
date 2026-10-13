export function Hero(movie) {
    const backdropUrl =
        `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;

    return `
        <style>
            .hero {
                position: relative;
                isolation: isolate;
                height: 100%;
                overflow: hidden;
            }

            /* Background Image */
            .hero-background {
                position: absolute;
                inset: 0;
                z-index: -1;
            }

            .hero-background img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
            }

            /* Dark overlay */
            .hero-overlay {
                position: absolute;
                inset: 0;
            }

            /* Left gradient for text */
            .hero-gradient-left {
                position: absolute;
                inset: 0;
                background: linear-gradient(
                    to right,
                    #0a0a0a 0%,
                    rgba(10, 10, 10, 0.8) 55%,
                    transparent 100%
                );
            }

            /* Bottom fade */
            .hero-gradient-bottom {
                position: absolute;
                inset: auto 0 0;
                height: 192px;
                background: linear-gradient(
                    to top,
                    #0a0a0a,
                    transparent
                );
            }

            /* Hero Content */
            .hero-container {
                display: flex;
                align-items: center;
                min-height: calc(100vh - 5rem);
                max-width: 1280px;
                margin: 0 auto;
                padding: 0 24px;
            }

            .hero-content {
                max-width: 672px;
                padding: 80px 0;
            }

            /* Label */
            .hero-label {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 20px;
            }

            .hero-label-line {
                width: 32px;
                height: 4px;
                flex-shrink: 0;
                border-radius: 9999px;
                background-color: #9333ea;
            }

            .hero-label-text {
                color: #c084fc;
                font-size: 14px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.25em;
            }

            /* Title */
            .hero-title {
                color: #ffffff;
                font-size: 48px;
                font-weight: 900;
                line-height: 0.95;
                letter-spacing: -0.025em;
            }

            /* Movie information */
            .hero-info {
                display: flex;
                align-items: center;
                gap: 16px;
                margin-top: 24px;
                color: #d4d4d4;
                font-size: 14px;
            }

            .hero-release {
                color: #ffffff;
                font-weight: 600;
            }

            .hero-info-dot {
                width: 4px;
                height: 4px;
                flex-shrink: 0;
                border-radius: 50%;
                background-color: #737373;
            }

            .hero-rating {
                display: flex;
                align-items: center;
                gap: 4px;
            }

            .hero-star {
                color: #facc15;
            }

            /* Description */
            .hero-description {
                max-width: 576px;
                margin-top: 20px;
                color: #d4d4d4;
                font-size: 16px;
                line-height: 28px;
            }

            /* Buttons */
            .hero-buttons {
                display: flex;
                flex-wrap: wrap;
                gap: 12px;
                margin-top: 32px;
            }

            .hero-button {
                display: inline-block;
                padding: 14px 28px;
                border-radius: 9999px;
                color: #ffffff;
                font-size: 14px;
                font-weight: 600;
                text-decoration: none;
                transition:
                    background-color 0.2s ease,
                    border-color 0.2s ease;
            }

            .hero-button-primary {
                background-color: #9333ea;
                box-shadow: 0 10px 15px -3px rgba(88, 28, 135, 0.2);
            }

            .hero-button-primary:hover {
                background-color: #a855f7;
            }

            .hero-button-secondary {
                border: 1px solid rgba(255, 255, 255, 0.15);
                background-color: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
            }

            .hero-button-secondary:hover {
                background-color: rgba(255, 255, 255, 0.15);
            }

            /* Responsive styles */
            @media (min-width: 640px) {
                .hero-title {
                    font-size: 60px;
                }

                .hero-description {
                    font-size: 18px;
                }
            }

            @media (min-width: 1024px) {
                .hero-title {
                    font-size: 72px;
                }
            }

            @media (max-width: 480px) {
                .hero-container {
                    padding: 0 16px;
                }

                .hero-content {
                    padding: 64px 0;
                }

                .hero-title {
                    font-size: 40px;
                    overflow-wrap: anywhere;
                }

                .hero-label-text {
                    font-size: 11px;
                    letter-spacing: 0.18em;
                }

                .hero-description {
                    font-size: 14px;
                    line-height: 24px;
                }

                .hero-button {
                    padding: 12px 20px;
                    font-size: 13px;
                }
            }
        </style>

        <section class="hero">

            <!-- Background Image -->
            <div class="hero-background">
                <img
                    src="${backdropUrl}"
                    alt=""
                />

                <!-- Dark overlay -->
                <div class="hero-overlay"></div>

                <!-- Left gradient for text -->
                <div class="hero-gradient-left"></div>

                <!-- Bottom fade -->
                <div class="hero-gradient-bottom"></div>
            </div>

            <!-- Hero Content -->
            <div class="hero-container">

                <div class="hero-content">

                    <!-- Label -->
                    <div class="hero-label">
                        <span class="hero-label-line"></span>

                        <span class="hero-label-text">
                            Featured Movie
                        </span>
                    </div>

                    <!-- Title -->
                    <h1 class="hero-title">
                        ${movie.title}
                    </h1>

                    <!-- Movie information -->
                    <div class="hero-info">

                        <span class="hero-release">
                            ${movie.release_date?.slice(0, 4) || "N/A"}
                        </span>

                        <span class="hero-info-dot"></span>

                        <span class="hero-rating">
                            <span class="hero-star">★</span>
                            ${movie.vote_average?.toFixed(1) ?? "N/A"}
                        </span>

                    </div>

                    <!-- Description -->
                    <p class="hero-description">
                        ${movie.overview || "No description available."}
                    </p>

                    <!-- Buttons -->
                    <div class="hero-buttons">

                        <a
                            href="./pages/movie.html?id=${movie.id}"
                            class="hero-button hero-button-primary"
                        >
                            View Movie
                        </a>

                        <a
                            href="./pages/movies.html"
                            class="hero-button hero-button-secondary"
                        >
                            Explore Movies
                        </a>

                    </div>

                </div>

            </div>

        </section>
    `;
}