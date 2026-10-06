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


export {
    getPopularMovies,
    searchMovies,
    getMovieDetails
};