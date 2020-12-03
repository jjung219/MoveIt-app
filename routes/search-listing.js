
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const userId = req.session['user_id'];
    console.log("Searching listings...");

    const search = req.body;
    const searchedItem = req.body['item-name'];
    const searchedMinPrice = req.body['min-price'];
    const searchedMaxPrice = req.body['max-price'];
    const queryParams = [];

    let queryString = `
      SELECT *
      FROM items
    `;

    // if name is present
    if (searchedItem) {
      queryParams.push(`%${searchedItem}%`);
      queryString += `WHERE name LIKE $${queryParams.length}`;
      if (searchedMinPrice) {
        // if name and min-price present
        queryParams.push(searchedMinPrice);
        queryString += `AND price >= $${queryParams.length}`;
        if (searchedMaxPrice) {
          // if all present
          queryParams.push(searchedMaxPrice);
          queryString += `AND price <= $${queryParams.length}`;
        }
      }
      if (searchedMaxPrice) {
        // if name and max-price present
        queryParams.push(searchedMaxPrice);
        queryString += `AND price <= $${queryParams.length}`;
      }
    } else if (searchedMinPrice) {
      // if name not present, min-price is present
      queryParams.push(searchedMinPrice);
      queryString += `WHERE price >= $${queryParams.length}`;
      if (searchedMaxPrice) {
        // if name not present, min-price and max-price present
        queryParams.push(searchedMaxPrice);
        queryString += `AND price <= $${queryParams.length}`;
      }
    } else if (searchedMaxPrice) {
      // if name and min-price not present, max-price present
      queryParams.push(searchedMaxPrice);
      queryString += `WHERE price <= $${queryParams.length}`;
    }

    // console.log('query:', queryString);
    // console.log('params: ',queryParams)
    db
    .query(queryString, queryParams)
    .then(result => {
      const items = result.rows;
      const templateVars = { itemsArr: {} , user: req.session['user_id'] };
      for (item of items) {
        templateVars.itemsArr[item.id] = item;
      }
      db.query(`SELECT item_id
      FROM favorites
      where favorites.user_id = $1`, [userId])
        .then(result => {
          favouritesIds = result.rows
          templateVars.favourited = false
          templateVars.favIds = favouritesIds.map(itemFav => itemFav.item_id)

          return res.render('index', templateVars)
        })
    })
    .catch(err => console.log('Error: ', err.stack));

  });
  return router;
};
