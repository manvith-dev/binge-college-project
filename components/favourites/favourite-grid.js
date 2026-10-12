
import { FavouriteCard } from "./favourite-card.js";

export function FavouriteGrid(movies) {
    return `
        <section>
            <div class="mb-8">
                <p class="text-sm font-semibold uppercase tracking-[0.2em] text-purple-400">
                    Your Collection
                </p>
                <h2 class="mt-2 text-2xl font-bold text-white sm:text-3xl">
                    Movies You Love
                </h2>
                <p class="mt-2 text-sm text-neutral-400">
                    ${movies.length} ${movies.length === 1 ? "movie" : "movies"} saved to your favourites
                </p>
            </div>

            ${movies.length === 0
            ? `
                        <div class="flex flex-col items-center justify-center rounded-2xl bg-neutral-900/40 px-6 py-16 text-center">
                            <div class="text-5xl text-neutral-700">♡</div>
                            <h3 class="mt-5 text-xl font-bold text-white">No favourites yet</h3>
                            <p class="mt-2 max-w-sm text-sm text-neutral-500">
                                Start exploring movies and save the ones you love.
                            </p>
                            <a href="./movies.html"
                               class="mt-6 rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-500">
                                Explore Movies
                            </a>
                        </div>
                    `
            : `
                        <div class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                            ${movies.map(movie => FavouriteCard(movie)).join("")}
                        </div>
                    `
        }
        </section>
    `;
}
