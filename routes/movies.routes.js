// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require("express");
const router = express.Router();

// all your routes here
router.get("/", (req, res, next) => res.render("movies/all-movies"));

module.exports = router;

// try {
//     await res.render("./movies/movies")
// } catch (err) {
//     next(err)
// }
