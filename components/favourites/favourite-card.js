
export function FavouriteCard(movie) {
    return `
        <article class="group min-w-0 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 p-3 transition duration-300 hover:border-purple-500/50">
            <a href="./movie.html?id=${movie.movie_id}" class="block">
                <div class="overflow-hidden rounded-xl bg-neutral-900">
                    <img
                        src="https://image.tmdb.org/t/p/w342${movie.poster_path}"
                        alt="${movie.title}"
                        loading="lazy"
                        class="aspect-[2/3] w-full rounded-xl object-cover transition duration-300 group-hover:scale-105"
                    />
                </div>
            </a>

            <div class="mt-3 flex items-start justify-between gap-2">
                <h3 class="line-clamp-2 min-w-0 flex-1 px-1 text-sm font-semibold leading-5 text-white transition group-hover:text-purple-300 sm:text-base">
                    ${movie.title}
                </h3>

                <button
                    class="remove-favourite flex size-9 shrink-0 items-center justify-center rounded-full text-lg text-purple-400 transition hover:bg-red-500/10 hover:text-red-400"
                    data-id="${movie.movie_id}"
                    title="Remove from favourites"
                    aria-label="Remove ${movie.title} from favourites"
                >
                    ♥
                </button>
            </div>
        </article>
    `;
}
