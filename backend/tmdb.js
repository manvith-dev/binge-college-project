const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_TOKEN}`
};

// Get popular movies
async function getPopularMovies(page = 1) {
    const response = await fetch(
        `${BASE_URL}/movie/popular?language=en-US&page=${page}`,
        { headers }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch popular movies");
    }

    return await response.json();
}

async function searchMovies(query, page = 1) {
    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
                accept: "application/json"
            }
        }
    );

    if (!response.ok) {
        throw new Error(`TMDB error: ${response.status} ${await response.text()}`);
    }

    return response.json();
}


// Get movie details
async function getMovieDetails(movieId) {
    const response = await fetch(
        `${BASE_URL}/movie/${movieId}?language=en-US`,
        { headers }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch movie details");
    }

    return await response.json();
}

module.exports = {
    getPopularMovies,
    getMovieDetails,
    searchMovies
};