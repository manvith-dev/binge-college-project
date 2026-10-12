export function FavouriteCard(movie) {
    return `
        <article class="group">

            <a href="./movie.html?id=${movie.movie_id}">
                <div class="overflow-hidden rounded-2xl bg-neutral-900">

                    <img
                        src="https://image.tmdb.org/t/p/w342${movie.poster_path}"
                        alt="${movie.title}"
                        class="aspect-[2/3] w-full object-cover transition duration-300 group-hover:scale-105"
                    />

                </div>
            </a>

            <div class="mt-3 flex items-start justify-between gap-3">

                <h3 class="line-clamp-2 font-semibold text-white">
                    ${movie.title}
                </h3>

                <button
                    class="remove-favourite shrink-0 text-xl text-purple-400 transition hover:text-red-400"
                    data-id="${movie.movie_id}"
                    title="Remove from favourites"
                >
                    ♥
                </button>

            </div>

        </article>
    `;
}