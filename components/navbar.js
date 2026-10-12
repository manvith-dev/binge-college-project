export function Navbar(isSubPage = false) {
    const home = isSubPage ? "../index.html" : "./index.html";
    const movies = isSubPage ? "./movies.html" : "./pages/movies.html";
    const favourites = isSubPage
        ? "./favourites.html"
        : "./pages/favourites.html";

    return `
        <nav class="sticky top-0 z-50 border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-lg">
            <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                <a href="${home}" class="text-2xl font-black tracking-tight text-white">
                    Binge<span class="text-purple-500">.</span>
                </a>

                <div class="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/70 p-1">
                    <a href="${home}" class="rounded-full px-5 py-2.5 text-sm font-medium text-neutral-400 transition hover:bg-neutral-800 hover:text-white">Home</a>
                    <a href="${movies}" class="rounded-full px-5 py-2.5 text-sm font-medium text-neutral-400 transition hover:bg-neutral-800 hover:text-white">Movies</a>
                    <a href="${favourites}" class="rounded-full px-5 py-2.5 text-sm font-medium text-neutral-400 transition hover:bg-neutral-800 hover:text-white">Favourites</a>
                </div>
            </div>
        </nav>
    `;
}