
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log("Searching listings...");

    const search = req.body;
    console.log(search);

    const queryString = `
      SELECT *
      FROM items
    `;

    db
    .query(queryString)
    .then(result => {
      const items = result.rows;
      const templateVars = { items: {} };
      for (item of items) {
        templateVars.items[item.id] = item;
      }
      // console.log(templateVars);
      console.log(templateVars.items[5].description)
      return res.render('index', templateVars);
    })

    // console.log(templateVars)

    // res.render('index', templateVars);
  });
  return router;
};
