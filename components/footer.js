export function Footer(isSubPage = false) {
    const home = isSubPage ? "../index.html" : "./index.html";
    const movies = isSubPage ? "./movies.html" : "./pages/movies.html";
    const favourites = isSubPage
        ? "./favourites.html"
        : "./pages/favourites.html";

    return `
        <style>
            .footer {
                border-top: 1px solid #262626;
                background-color: #0a0a0a;
                color: #ffffff;
            }

            .footer-container {
                max-width: 1280px;
                margin: 0 auto;
                padding: 48px 24px;
            }

            .footer-content {
                display: flex;
                flex-direction: column;
                gap: 40px;
            }

            .footer-brand {
                max-width: 384px;
            }

            .footer-logo {
                color: #ffffff;
                font-size: 24px;
                font-weight: 900;
                letter-spacing: -0.6px;
                text-decoration: none;
            }

            .footer-logo span {
                color: #a855f7;
            }

            .footer-description {
                margin-top: 16px;
                color: #737373;
                font-size: 14px;
                line-height: 24px;
            }

            .footer-heading {
                color: #ffffff;
                font-size: 14px;
                font-weight: 600;
            }

            .footer-links {
                display: flex;
                flex-direction: column;
                gap: 12px;
                margin-top: 16px;
                font-size: 14px;
            }

            .footer-links a,
            .footer-links span {
                color: #737373;
                text-decoration: none;
            }

            .footer-links a {
                transition: color 0.2s ease;
            }

            .footer-links a:hover {
                color: #ffffff;
            }

            .footer-bottom {
                display: flex;
                flex-direction: column;
                gap: 16px;
                margin-top: 48px;
                padding-top: 24px;
                border-top: 1px solid #262626;
                font-size: 14px;
            }

            .footer-bottom p {
                color: #525252;
            }

            @media (min-width: 768px) {
                .footer-content {
                    flex-direction: row;
                    align-items: flex-start;
                    justify-content: space-between;
                }
            }

            @media (min-width: 640px) {
                .footer-bottom {
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                }
            }

            @media (max-width: 480px) {
                .footer-container {
                    padding: 36px 16px;
                }

                .footer-content {
                    gap: 32px;
                }

                .footer-bottom {
                    margin-top: 36px;
                }
            }
        </style>

        <footer class="footer">
            <div class="footer-container">

                <!-- Brand -->
                <div class="footer-content">

                    <div class="footer-brand">
                        <a href="${home}" class="footer-logo">
                            Binge<span>.</span>
                        </a>

                        <p class="footer-description">
                            Discover your next favourite movie.
                            Explore popular films, find hidden gems,
                            and keep track of everything you want to watch.
                        </p>
                    </div>

                    <!-- Navigation -->
                    <div>
                        <h3 class="footer-heading">Explore</h3>

                        <div class="footer-links">
                            <a href="${home}">Home</a>
                            <a href="${movies}">Movies</a>
                            <a href="${favourites}">Favourites</a>
                        </div>
                    </div>

                    <!-- Project -->
                    <div>
                        <h3 class="footer-heading">Binge</h3>

                        <div class="footer-links">
                            <span>Movie Explorer</span>
                            <span>Built with Vanilla JS</span>
                            <span>Powered by TMDB</span>
                        </div>
                    </div>

                </div>

                <!-- Bottom -->
                <div class="footer-bottom">
                    <p>© 2026 Binge. All rights reserved.</p>
                    <p>Made for movie lovers 🎬</p>
                </div>

            </div>
        </footer>
    `;
}