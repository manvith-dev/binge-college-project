async function getPopularMovies(page = 1) {
    const response = await fetch(
        `http://localhost:3000/api/movies/popular?page=${page}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch movies");
    }

    return await response.json();
}


async function searchMovies(query, page = 1) {
    const response = await fetch(
        `http://localhost:3000/api/movies/search?query=${encodeURIComponent(query)}&page=${page}`
    );

    if (!response.ok) {
        throw new Error("Failed to search movies");
    }

    return await response.json();
}


async function getMovieDetails(movieId) {
    const response = await fetch(
        `http://localhost:3000/api/movies/${movieId}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch movie details");
    }

    return await response.json();
}

export async function getFavourites() {
    const response = await fetch(
        "http://localhost:3000/api/favourites"
    );

    if (!response.ok) {
        throw new Error("Failed to fetch favourites");
    }

    return await response.json();
}


export async function addFavourite(movie) {
    const response = await fetch(
        "http://localhost:3000/api/favourites",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                movie_id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path
            })
        }
    );

    if (!response.ok) {
        throw new Error("Failed to add favourite");
    }

    return await response.json();
}


export async function removeFavourite(movieId) {
    const response = await fetch(
        `http://localhost:3000/api/favourites/${movieId}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error("Failed to remove favourite");
    }

    return await response.json();
}

export {
    getPopularMovies,
    searchMovies,
    getMovieDetails
};