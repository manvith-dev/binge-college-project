export function Footer(isSubPage = false) {
    const home = isSubPage ? "../index.html" : "./index.html";
    const movies = isSubPage ? "./movies.html" : "./pages/movies.html";
    const favourites = isSubPage
        ? "./favourites.html"
        : "./pages/favourites.html";

    return `
        <footer class="border-t border-neutral-800 bg-neutral-950">
            <div class="mx-auto max-w-7xl px-6 py-12">
                <div class="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">

                    <!-- Brand -->
                    <div class="max-w-sm">
                        <a href="${home}" class="text-2xl font-black tracking-tight text-white">
                            Binge<span class="text-purple-500">.</span>
                        </a>

                        <p class="mt-4 text-sm leading-6 text-neutral-500">
                            Discover your next favourite movie.
                            Explore popular films, find hidden gems,
                            and keep track of everything you want to watch.
                        </p>
                    </div>

                    <!-- Navigation -->
                    <div>
                        <h3 class="text-sm font-semibold text-white">Explore</h3>

                        <div class="mt-4 flex flex-col gap-3 text-sm">
                            <a href="${home}" class="text-neutral-500 transition hover:text-white">Home</a>
                            <a href="${movies}" class="text-neutral-500 transition hover:text-white">Movies</a>
                            <a href="${favourites}" class="text-neutral-500 transition hover:text-white">Favourites</a>
                        </div>
                    </div>

                    <!-- Project -->
                    <div>
                        <h3 class="text-sm font-semibold text-white">Binge</h3>

                        <div class="mt-4 flex flex-col gap-3 text-sm">
                            <span class="text-neutral-500">Movie Explorer</span>
                            <span class="text-neutral-500">Built with Vanilla JS</span>
                            <span class="text-neutral-500">Powered by TMDB</span>
                        </div>
                    </div>

                </div>

                <!-- Bottom -->
                <div class="mt-12 flex flex-col gap-4 border-t border-neutral-800 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <p class="text-neutral-600">
                        © 2026 Binge. All rights reserved.
                    </p>

                    <p class="text-neutral-600">
                        Made for movie lovers 🎬
                    </p>
                </div>
            </div>
        </footer>
    `;
}