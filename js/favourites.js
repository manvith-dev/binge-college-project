import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import { FavouriteGrid } from "../components/favourites/favourite-grid.js";
import { getFavourites, removeFavourite } from "./api.js";

// ---------------- INTERNAL CSS ----------------

if (!document.getElementById("favourites-page-styles")) {
    const style = document.createElement("style");
    style.id = "favourites-page-styles";

    style.textContent = `
        /* Loading State */
        .favourites-loading {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 40vh;
        }

        .favourites-loading p {
            color: #a3a3a3;
            font-size: 14px;
            animation: favourites-pulse 1.5s ease-in-out infinite;
        }

        @keyframes favourites-pulse {
            0%, 100% {
                opacity: 1;
            }

            50% {
                opacity: 0.4;
            }
        }

        /* Error State */
        .favourites-error {
            padding: 32px;
            border: 1px solid rgba(127, 29, 29, 0.5);
            border-radius: 16px;
            background-color: rgba(69, 10, 10, 0.2);
            text-align: center;
        }

        .favourites-error-title {
            color: #ffffff;
            font-weight: 600;
        }

        .favourites-error-message {
            margin-top: 8px;
            color: #a3a3a3;
            font-size: 14px;
        }

        /* Retry Button */
        .retry-favourites-button {
            margin-top: 20px;
            padding: 10px 20px;
            border: none;
            border-radius: 9999px;
            background-color: #9333ea;
            color: #ffffff;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }

        .retry-favourites-button:hover {
            background-color: #a855f7;
        }

        .retry-favourites-button:focus-visible {
            outline: 2px solid #c084fc;
            outline-offset: 3px;
        }

        /* Remove Favourite Button State */
        .remove-favourite.opacity-50 {
            opacity: 0.5;
            cursor: wait;
        }

        @media (prefers-reduced-motion: reduce) {
            .favourites-loading p {
                animation: none;
            }
        }
    `;

    document.head.appendChild(style);
}

// ---------------- DOM ELEMENTS ----------------

const container = document.getElementById("favourites-grid");

document.getElementById("navbar").innerHTML = Navbar(true);
document.getElementById("footer").innerHTML = Footer(true);

// ---------------- LOAD FAVOURITES ----------------

async function loadFavourites() {
    container.innerHTML = `
        <div class="favourites-loading">
            <p>Loading your collection...</p>
        </div>
    `;

    try {
        const favourites = await getFavourites();

        container.innerHTML = FavouriteGrid(favourites);

        container.querySelectorAll(".remove-favourite").forEach(button => {
            button.addEventListener("click", async () => {
                const movieId = button.dataset.id;

                button.disabled = true;
                button.classList.add("opacity-50");

                try {
                    await removeFavourite(movieId);
                    await loadFavourites();
                } catch (error) {
                    console.error("Remove failed:", error);

                    button.disabled = false;
                    button.classList.remove("opacity-50");
                }
            });
        });
    } catch (error) {
        console.error("Loading favourites failed:", error);

        container.innerHTML = `
            <div class="favourites-error">
                <p class="favourites-error-title">
                    Couldn't load your favourites
                </p>

                <p class="favourites-error-message">
                    Check your backend connection and try again.
                </p>

                <button
                    id="retry-favourites"
                    class="retry-favourites-button"
                    type="button"
                >
                    Try Again
                </button>
            </div>
        `;

        document
            .getElementById("retry-favourites")
            .addEventListener("click", loadFavourites);
    }
}

// ---------------- START ----------------

loadFavourites();