require("dotenv").config();

const express = require("express");
const db = require("./database");

const {
    getPopularMovies,
    getMovieDetails
} = require("./tmdb");

const app = express();

app.use(express.json());


// Popular movies
app.get("/api/movies/popular", async (req, res) => {
    try {
        const page = req.query.page || 1;

        const data = await getPopularMovies(page);

        res.json(data);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch popular movies"
        });
    }
});



// Movie details
app.get("/api/movies/:id", async (req, res) => {
    try {
        const movie = await getMovieDetails(req.params.id);

        res.json(movie);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch movie details"
        });
    }
});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});