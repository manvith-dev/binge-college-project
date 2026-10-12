
import { Navbar } from "./components/navbar.js";
import { Hero } from "./components/hero.js";
import { MovieGrid } from "./components/movie-grid.js";
import { Footer } from "./components/footer.js";
import { getPopularMovies, addFavourite } from "./js/api.js";

document.getElementById("navbar").innerHTML = Navbar();
document.getElementById("footer").innerHTML = Footer();

const data = await getPopularMovies();

document.getElementById("hero").innerHTML =
    Hero(data.results[0]);

document.getElementById("popular-movies").innerHTML =
    MovieGrid(data.results);

// Handle favourite button clicks
document.querySelectorAll(".add-favourite").forEach(button => {
    button.addEventListener("click", async () => {
        const movie = data.results.find(
            movie => String(movie.id) === button.dataset.id
        );

        if (!movie) return;

        button.disabled = true;

        try {
            await addFavourite(movie);

            button.textContent = "♥";
            button.classList.add("text-purple-400");
            button.title = "Saved to favourites";
            button.setAttribute("aria-label", "Saved to favourites");

        } catch (error) {
            console.error(error);
            alert("Couldn't save this movie. Check that your backend is running.");
        } finally {
            button.disabled = false;
        }
    });
});
