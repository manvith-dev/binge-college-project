# Binge

Binge is a movie exploration website built with HTML, CSS, Vanilla JavaScript, Node.js, Express, and SQLite. It uses the TMDB API through an existing backend to provide movie discovery and details.

## Features

- **Browse Movies:** Explore popular movies.
- **Search:** Find movies by title.
- **Movie Details:** View posters, overviews, release dates, ratings, and other details.
- **Favourites:** Add and remove movies from your favourites.
- **Responsive UI:** Dark theme with purple accents and a clean, modern layout.

## Tech Stack

- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Backend:** Node.js, Express
- **Database:** SQLite
- **Movie Data:** TMDB API

## Getting Started

### Prerequisites

- Node.js and npm
- A configured TMDB API key

### Installation

1. Clone the repository and navigate to the project directory.
2. Install the backend dependencies:

   ```bash
   cd backend
   npm install
   ```

   Running the Application

3. Start the backend server from the project root:
   node backend/server.js
4. Open index.html using a local development server, such as VS Code Live Server, on port 5500.
   The frontend runs at http://127.0.0.1:5500, and the backend API runs at http://localhost:3000/api.
   Project Structure
   ```
   movieWebsite/
   ├── index.html
   ├── pages/
   │ ├── movies.html
   │ ├── movie.html
   │ └── favourites.html
   ├── components/
   ├── js/
   ├── backend/
   │ ├── server.js
   │ ├── database.js
   │ └── tmdb.js
   └── README.md
   ```

### License

This project is intended for educational purposes.
