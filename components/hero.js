export function Hero(movie) {

    const backdropUrl =
        `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;

    return `
        <section class="relative isolate h-full overflow-hidden">

            <!-- Background Image -->
            <div class="absolute inset-0 -z-10">
                <img
                    src="${backdropUrl}"
                    alt=""
                    class="h-full w-full object-cover object-center"
                />

                <!-- Dark overlay -->
                <div class="absolute inset-0"></div>

                <!-- Left gradient for text -->
                <div class="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent"></div>

                <!-- Bottom fade -->
                <div class="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-neutral-950 to-transparent"></div>
            </div>


            <!-- Hero Content -->
            <div class="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center px-6">

                <div class="max-w-2xl py-20">

                    <!-- Label -->
                    <div class="mb-5 flex items-center gap-3">
                        <span class="h-1 w-8 rounded-full bg-purple-600"></span>

                        <span class="text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
                            Featured Movie
                        </span>
                    </div>


                    <!-- Title -->
                    <h1 class="text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
                        ${movie.title}
                    </h1>


                    <!-- Movie information -->
                    <div class="mt-6 flex items-center gap-4 text-sm text-neutral-300">

                        <span class="font-semibold text-white">
                            ${movie.release_date?.slice(0, 4) || "N/A"}
                        </span>

                        <span class="h-1 w-1 rounded-full bg-neutral-500"></span>

                        <span class="flex items-center gap-1">
                            <span class="text-yellow-400">★</span>
                            ${movie.vote_average?.toFixed(1)}
                        </span>

                    </div>


                    <!-- Description -->
                    <p class="mt-5 max-w-xl text-base leading-7 text-neutral-300 sm:text-lg">
                        ${movie.overview}
                    </p>


                    <!-- Buttons -->
                    <div class="mt-8 flex flex-wrap gap-3">

                        <a
                            href="./pages/movie.html?id=${movie.id}"
                            class="rounded-full bg-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/20 transition hover:bg-purple-500"
                        >
                            View Movie
                        </a>

                        <a
                            href="./pages/movies.html"
                            class="rounded-full border border-white/15 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
                        >
                            Explore Movies
                        </a>

                    </div>

                </div>

            </div>

        </section>
    `;
}