const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    const queryString = `
      SELECT *
      FROM items
      WHERE user_id = 5
    `;

    db
    .query(queryString)
    .then(result => {
      const items = result.rows;
      const templateVars = { items: {} };
      for (item of items) {
        templateVars.items[item.id] = item;
      }
      return res.render('my-listings', templateVars);
    })
    .catch(err => console.log('Error: ', err.stack));

  });
  return router;
};
