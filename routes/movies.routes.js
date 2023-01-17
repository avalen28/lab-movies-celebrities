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
    const movieFromDB = await Movie.findById(movieId).populate("cast");
    res.render("movies/movie-details", movieFromDB);
  } catch (err) {
    console.log(err);
  }
});

router.post("/:movieId/delete", async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const movieFromDB = await Movie.findByIdAndRemove(movieId);
    res.redirect("/movies");
  } catch (err) {
    console.log(err);
  }
});

router.get("/:movieId/edit", async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const movieFromDB = await Movie.findById(movieId);
    const celebritiesFromDB = await Celebrity.find({});
    res.render("movies/edit-movie", { movieFromDB, celebritiesFromDB });
  } catch (err) {
    console.log(err);
  }
});

router.post("/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;
  try {
    if (typeof cast === "string") {
      await Movie.findByIdAndUpdate(id, {
        title,
        genre,
        plot,
        cast: [cast],
      });
    } else {
      await Movie.findByIdAndUpdate(id, {
        title,
        genre,
        plot,
        cast: cast,
      });
    }
    res.redirect(`/movies/${id}`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
