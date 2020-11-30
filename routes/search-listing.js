
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log("Searching listings...");

    const search = req.body;
    const searchedItem = req.body['item-name'];
    const searchedMinPrice = Number(req.body['min-price']);
    const searchedMaxPrice = Number(req.body['max-price']);
    console.log(search);
    const queryParams = [ searchedItem, searchedMinPrice, searchedMaxPrice];


    const queryString = `
      SELECT *
      FROM items
      WHERE name = $1
      AND price >= $2
      AND price <= $3
    `;

    db
    .query(queryString, queryParams)
    .then(result => {
      const items = result.rows;
      const templateVars = { items: {} };
      for (item of items) {
        templateVars.items[item.id] = item;
      }
      return res.render('index-search', templateVars);
    })

  });
  return router;
};
