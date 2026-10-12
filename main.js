import { Navbar } from "./components/navbar.js";
import { Hero } from "./components/hero.js";
import { MovieGrid } from "./components/movie-grid.js";
import { Footer } from "./components/footer.js";
import { getPopularMovies } from "./js/api.js";

document.getElementById("navbar").innerHTML = Navbar();

const data = await getPopularMovies();

document.getElementById("hero").innerHTML =
    Hero(data.results[0]);

document.getElementById("popular-movies").innerHTML =
    MovieGrid(data.results);

document.getElementById("footer").innerHTML =
    Footer();