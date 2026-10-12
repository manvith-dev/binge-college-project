
export function MovieGrid(movies) {
    return `
        <section class="mx-auto max-w-7xl px-6 py-16">

            <div class="mb-6 flex items-end justify-between">
                <div>
                    <p class="text-sm font-semibold uppercase tracking-[0.2em] text-purple-400">
                        What's trending
                    </p>

                    <h2 class="mt-2 text-3xl font-bold text-white">
                        Popular Movies
                    </h2>
                </div>

                <a
                    href="./pages/movies.html"
                    class="text-sm font-medium text-neutral-400 transition hover:text-white"
                >
                    View all →
                </a>
            </div>

            <div class="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">

                ${movies.map(movie => `
                    <div class="w-44 flex-none sm:w-52">

                        <div class="relative overflow-hidden rounded-2xl bg-neutral-900">

    <a href="./pages/movie.html?id=${movie.id}" class="block">
        <img
            src="https://image.tmdb.org/t/p/w342${movie.poster_path}"
            alt="${movie.title}"
            class="block aspect-[2/3] w-full object-cover"
        />
    </a>

    <button
    type="button"
    class="add-favourite"
    data-id="${movie.id}"
    style="
        position: absolute;
        top: 12px;
        right: 12px;
        z-index: 9999;
        width: 44px;
        height: 44px;
        background: black;
        color: white;
        border-radius: 50%;
        font-size: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    "
>
    ♡
</button>

</div>

                        <h3 class="mt-3 truncate font-semibold text-white">
                            ${movie.title}
                        </h3>

                        <div class="mt-1 flex items-center gap-2 text-sm text-neutral-400">
                            <span>${movie.release_date?.slice(0, 4) || "N/A"}</span>
                            <span>•</span>
                            <span class="text-yellow-400">
                                ★ ${movie.vote_average?.toFixed(1) ?? "N/A"}
                            </span>
                        </div>

                    </div>
                `).join("")}

            </div>
        </section>
    `;
}
