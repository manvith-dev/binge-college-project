import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import { FavouriteGrid } from "../components/favourite-grid.js";

import {
    getFavourites,
    removeFavourite
} from "./api.js";


document.getElementById("navbar").innerHTML = Navbar();
document.getElementById("footer").innerHTML = Footer();


const container = document.getElementById("favourites-grid");


async function loadFavourites() {

    try {

        const favourites = await getFavourites();

        container.innerHTML = FavouriteGrid(favourites);

        document
            .querySelectorAll(".remove-favourite")
            .forEach(button => {

                button.addEventListener("click", async () => {

                    await removeFavourite(button.dataset.id);

                    loadFavourites();

                });

            });

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <p class="col-span-full text-center text-red-400">
                Failed to load favourites.
            </p>
        `;
    }
}


loadFavourites();