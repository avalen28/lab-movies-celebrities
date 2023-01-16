// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/", async (req, res, next) => {
  try {
    const celebritiesFromDB = await Celebrity.find({});
    res.render("celebrities/all-celebrities", { celebritiesFromDB });
  } catch (error) {
    console.log(error);
  }
});

router.get("/create", (req, res, next) =>
  res.render("celebrities/new-celebrity")
);

router.post("/create", async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  try {
    /*const celebrityCreated =*/ await Celebrity.create({
      name,
      occupation,
      catchPhrase,
    });
    res.redirect("/celebrities");
  } catch (error) {
    res.render("celebrities/new-celebrity");
  }
});
module.exports = router;
