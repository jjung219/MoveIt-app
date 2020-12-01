const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/:id/mark-item", (req, res) => {
    const userId = req.session.user_id;
    const itemId = req.params.id;

    const queryParams = [userId, itemId]
    let queryString = `
      SELECT items.active
      FROM items
      WHERE user_id = $1
      AND id = $2
    `;

    db
      .query(queryString, queryParams)
      .then((result)=> {
        const active = result.rows[0].active;
        console.log(active)
        if (active) {
          queryString = `
            UPDATE items
            SET active = FALSE
            WHERE user_id = $1
            AND id = $2
          `;
        } else {
          queryString = `
            UPDATE items
            SET active = TRUE
            WHERE user_id = $1
            AND id = $2
          `;
        }

        db
          .query(queryString, queryParams)
          .then(() => res.redirect('/listings'))
          .catch(err => console.log('Error: ', err.stack))
      })
      .catch(err => console.log('Error: ', err.stack));


  });
  return router;
};
