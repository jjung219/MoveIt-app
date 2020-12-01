
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = req.session['user_id'];
    const templateVars = { user: userId };

    res.render("search", templateVars)
  });
  return router;
};
