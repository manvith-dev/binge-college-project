const { DatabaseSync } = require("node:sqlite");
const path = require("node:path")

const db = new DatabaseSync(path.join(__dirname, "movies.db"));

db.exec(`
    CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        movie_id INTEGER UNIQUE NOT NULL,
        title TEXT NOT NULL,
        poster_path TEXT    
    )
`);

console.log("Database connected and favorites table is ready.");
module.exports = db;