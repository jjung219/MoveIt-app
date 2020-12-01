const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = req.session['user_id'];
    console.log(userId)
    const queryString = `
    SELECT *
    FROM items
    JOIN favorites on favorites.item_id = items.id
    WHERE favorites.user_id = $1;
    `;

    db
    .query(queryString, [userId])
    .then(result => {
      console.log(result.rows)
    })
    .catch(e => console.log(e.stack))

  })
  return router
}
