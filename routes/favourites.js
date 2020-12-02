const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let userId;
    let items;
    const queryString = `
    SELECT *
    FROM items
    JOIN favorites on favorites.item_id = items.id
    WHERE favorites.user_id = $1;
    `;

    db
    .query(queryString, [userId])
    .then(result => {
      userId = req.session['user_id']
      items = (result.rows);
      templateVar = { itemsArr: items, user: userId}
      res.render('favourites', templateVar)
    })
    .catch(e => console.log(e.stack))

  })
  return router
}
