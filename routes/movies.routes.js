// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require("express");
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");
const router = express.Router();

// all your routes here
router.get("/", async (req, res, next) => {
  try {
    const moviesFromDB = await Movie.find({}); //.populate("cast") para sacar las celeb.

    res.render("movies/all-movies", { moviesFromDB });
  } catch (err) {
    console.log(err);
  }
});

router.get("/create", async (req, res, next) => {
  try {
    const celebritiesFromDB = await Celebrity.find({});
    res.render("movies/new-movie", { celebritiesFromDB });
    console.log(celebritiesFromDB);
  } catch (err) {
    console.log(err);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const { title, genre, plot, cast } = req.body;
    if (typeof cast === "string") {
      Movie.create({
        title,
        genre,
        plot,
        cast: [cast],
      });
    } else {
      Movie.create({
        title,
        genre,
        plot,
        cast: cast,
      });
    }
    res.redirect("/movies");
  } catch (err) {
    console.log(err);
  }
});

router.get("/:movieId", async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const dataFromDB = await Movie.findById(movieId).populate("cast");
    res.render("movies/movie-details", { dataFromDB });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
