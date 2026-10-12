require("dotenv").config();

const express = require("express");
const db = require("./database");
const cors = require("cors");

const {
    getPopularMovies,
    getMovieDetails
} = require("./tmdb");

const app = express();

app.use(express.json());
app.use(cors());


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

// Get all favourites
app.get("/api/favourites", (req, res) => {
    try {
        const favourites = db
            .prepare("SELECT * FROM favorites ORDER BY id DESC")
            .all();

        res.json(favourites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch favourites" });
    }
});


// Add favourite
app.post("/api/favourites", (req, res) => {
    try {
        const { movie_id, title, poster_path } = req.body;

        db.prepare(`
            INSERT OR IGNORE INTO favorites
            (movie_id, title, poster_path)
            VALUES (?, ?, ?)
        `).run(movie_id, title, poster_path);

        res.json({ message: "Movie added to favourites" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add favourite" });
    }
});


// Remove favourite
app.delete("/api/favourites/:movieId", (req, res) => {
    try {
        db.prepare(`
            DELETE FROM favorites
            WHERE movie_id = ?
        `).run(req.params.movieId);

        res.json({ message: "Movie removed from favourites" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to remove favourite" });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});