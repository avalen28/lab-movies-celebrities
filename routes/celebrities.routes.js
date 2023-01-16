// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/", (req, res, next) => res.render("celebrities/celebrities"));
router.get("/create", (req, res, next) =>
  res.render("celebrities/new-celebrity")
);

router.post("/create", async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  try {
    const celebrityCreated = await Celebrity.create({
      name,
      occupation,
      catchPhrase,
    });
    console.log("cel. created", celebrityCreated);
    res.redirect("/celebrities");
  } catch (error) {
    res.render("celebrities/new-celebrity");
  }
});
module.exports = router;
