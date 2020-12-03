const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let userId = req.session['user_id'];
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
      items = (result.rows);
      templateVar = { itemsArr: items, user: userId}
      res.render('favourites', templateVar);
    })
    .catch(e => console.log(e.stack));

  })

  router.post("/:id", (req, res) => {
    let userId = req.session['user_id'];
    let itemId = req.params.id
    const queryParams = [itemId, userId]
    const queryString = `
    INSERT INTO
    favorites(item_id, user_id)
    VALUES
    ($1, $2);
    `;

    db
    .query(queryString, queryParams)
    .then(result => {
      res.redirect('/')
    })
    .catch(e => console.log(e.stack));
  })

  router.post("/:id/delete", (req, res) => {
    let userId = req.session['user_id'];
    let itemId = req.params.id
    const queryParams = [itemId, userId]
    const queryString = `
    DELETE FROM favorites
    WHERE item_id = $1
    AND user_id = $2
    `;

    db
    .query(queryString, queryParams)
    .then(result => {
      res.redirect('/')
    })
    .catch(e => console.log(e.stack));
  })


  return router

}
