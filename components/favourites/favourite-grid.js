import { FavouriteCard } from "./favourite-card.js";

export function FavouriteGrid(movies) {

    if (movies.length === 0) {
        return `
            <div class="col-span-full flex min-h-[40vh] flex-col items-center justify-center text-center">

                <div class="text-6xl text-neutral-700">
                    ♡
                </div>

                <h2 class="mt-5 text-2xl font-bold text-white">
                    No favourites yet
                </h2>

                <p class="mt-2 text-neutral-500">
                    Start exploring movies and save the ones you love.
                </p>

                <a
                    href="./movies.html"
                    class="mt-6 rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-500"
                >
                    Explore Movies
                </a>

            </div>
        `;
    }

    return `
        <div class="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            ${movies.map(movie => FavouriteCard(movie)).join("")}
        </div>
    `;
}