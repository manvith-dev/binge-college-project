import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import { FavouriteGrid } from "../components/favourites/favourite-grid.js";
import { getFavourites, removeFavourite } from "./api.js";

const container = document.getElementById("favourites-grid");

document.getElementById("navbar").innerHTML = Navbar(true);
document.getElementById("footer").innerHTML = Footer(true);

async function loadFavourites() {
    container.innerHTML = `
        <div class="flex min-h-[40vh] items-center justify-center">
            <p class="animate-pulse text-sm text-neutral-400">
                Loading your collection...
            </p>
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
            <div class="rounded-2xl border border-red-900/50 bg-red-950/20 p-8 text-center">
                <p class="font-semibold text-white">Couldn't load your favourites</p>
                <p class="mt-2 text-sm text-neutral-400">
                    Check your backend connection and try again.
                </p>
                <button
                    id="retry-favourites"
                    class="mt-5 rounded-full bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500"
                >
                    Try Again
                </button>
            </div>
        `;

        document.getElementById("retry-favourites")
            .addEventListener("click", loadFavourites);
    }
}

loadFavourites();