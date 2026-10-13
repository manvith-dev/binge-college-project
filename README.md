# Binge — Movies & Movie Details Pages

## Project Overview

Binge is a movie exploration website built using **HTML, Tailwind CSS, Vanilla JavaScript, Node.js, Express, and SQLite**. Movie data comes from the TMDB API through our existing backend.

Your task is to build:

- `pages/movies.html` — movie browsing page.
- `pages/movie.html` — individual movie details page.

Follow the existing Binge design: dark background, purple (`purple-600`) accents, rounded movie cards, and a clean, modern UI.

## Important Requirements

### 1. Movies Page

- Display movies fetched from our existing backend API.
- Include a search feature if possible.
- Each movie card should link to its details page using its TMDB movie ID.
- Include an **Add to Favourites** heart button.
- Prevent duplicate favourites and show suitable feedback when a movie is added.

### 2. Movie Details Page

The following URL **must work**:

`http://127.0.0.1:5500/pages/movie.html?id=969681`

The ID is an example; the page must work for any valid TMDB movie ID.

Requirements:

- Read the movie ID from the URL using `URLSearchParams`.
- Fetch that movie's details from our existing backend.
- Display its poster, title, overview, release date, rating, and other useful details.
- Include an Add to Favourites button.
- Handle invalid IDs, loading states, and API errors.

Example:

```js
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
```

## Existing Backend API

The backend already exists. **Do not create a new backend or connect directly to TMDB from the frontend.**

Base URL: `http://localhost:3000/api`

| Method | Endpoint                      | Purpose                            |
| ------ | ----------------------------- | ---------------------------------- |
| GET    | `/movies/popular`             | Fetch popular movies               |
| GET    | `/movies/search?query=batman` | Search movies                      |
| GET    | `/movies/:id`                 | Fetch details for a specific movie |
| GET    | `/favourites`                 | Get saved favourites               |
| POST   | `/favourites`                 | Add a movie to favourites          |
| DELETE | `/favourites/:movieId`        | Remove a favourite                 |

### Adding a Favourite

Send a `POST` request to:

`http://localhost:3000/api/favourites`

JSON body:

```json
{
  "movie_id": 969681,
  "title": "Movie Title",
  "poster_path": "/poster.jpg"
}
```

Use the actual movie object's `id`, `title`, and `poster_path` values. Do not hardcode the example values.

### Removing a Favourite

Send a `DELETE` request to:

`http://localhost:3000/api/favourites/MOVIE_ID`

Use the actual movie ID.

## Existing Project Structure

```text
movieWebsite/
├── index.html
├── pages/
│   ├── movies.html
│   ├── movie.html
│   └── favourites.html
├── components/
│   ├── navbar.js
│   ├── footer.js
│   └── favourites/
│       ├── favourite-card.js
│       └── favourite-grid.js
├── js/
│   ├── api.js
│   ├── movies.js
│   ├── movie-details.js
│   └── favourites.js
├── src/input.css
├── dist/output.css
└── backend/
    ├── server.js
    ├── database.js
    └── tmdb.js
```

Reuse existing components and `js/api.js` functions wherever possible. Check their current exports before implementing new functions.

## Important Rules

- Use plain HTML, Tailwind CSS, and Vanilla JavaScript. **Do not use React or another frontend framework.**
- Use ES modules (`import`/`export`).
- Reuse the existing Navbar and Footer components.
- For pages inside `pages/`, use `../dist/output.css` for the stylesheet.
- Keep the frontend on Live Preview port `5500` and the backend on port `3000`.
- Use TMDB poster URLs in this format:

`https://image.tmdb.org/t/p/w500/POSTER_PATH`

- Ensure navigation paths work from inside the `pages/` directory.
- Do not overwrite or break existing Home and Favourites functionality.

## Final Testing

1. Open `pages/movies.html` and verify movies load.
2. Add a movie to favourites and confirm it appears on `pages/favourites.html`.
3. Open `http://127.0.0.1:5500/pages/movie.html?id=969681` and verify the correct movie details load.
4. Test the favourites button on both pages.
5. Check the browser console for errors.

**Goal:** Build both pages so they integrate cleanly with the existing Binge project and its backend API.
