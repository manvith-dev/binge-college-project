export function Navbar(isSubPage = false) {
    const home = isSubPage ? "../index.html" : "./index.html";
    const movies = isSubPage ? "./movies.html" : "./pages/movies.html";
    const favourites = isSubPage
        ? "./favourites.html"
        : "./pages/favourites.html";

    return `
        <style>
            .navbar {
                position: sticky;
                top: 0;
                z-index: 50;
                border-bottom: 1px solid rgba(38, 38, 38, 0.8);
                background-color: rgba(10, 10, 10, 0.9);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
            }

            .navbar-container {
                max-width: 1280px;
                height: 80px;
                margin: 0 auto;
                padding: 0 24px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .navbar-logo {
                color: #ffffff;
                font-size: 24px;
                font-weight: 900;
                letter-spacing: -0.6px;
                text-decoration: none;
            }

            .navbar-logo span {
                color: #a855f7;
            }

            .navbar-links {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 4px;
                border: 1px solid #262626;
                border-radius: 9999px;
                background-color: rgba(23, 23, 23, 0.7);
            }

            .navbar-links a {
                padding: 10px 20px;
                border-radius: 9999px;
                color: #a3a3a3;
                font-size: 14px;
                font-weight: 500;
                text-decoration: none;
                transition:
                    background-color 0.2s ease,
                    color 0.2s ease;
            }

            .navbar-links a:hover {
                background-color: #262626;
                color: #ffffff;
            }

            @media (max-width: 480px) {
                .navbar-container {
                    height: 70px;
                    padding: 0 12px;
                }

                .navbar-logo {
                    font-size: 21px;
                }

                .navbar-links {
                    gap: 2px;
                }

                .navbar-links a {
                    padding: 9px 10px;
                    font-size: 12px;
                }
            }
        </style>

        <nav class="navbar">
            <div class="navbar-container">
                <a href="${home}" class="navbar-logo">
                    Binge<span>.</span>
                </a>

                <div class="navbar-links">
                    <a href="${home}">Home</a>
                    <a href="${movies}">Movies</a>
                    <a href="${favourites}">Favourites</a>
                </div>
            </div>
        </nav>
    `;
}