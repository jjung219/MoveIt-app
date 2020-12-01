const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post ("/:id/delete", (req, res) => {
    const userId = req.session.user_id;
    const itemId = req.params.id;


    const queryParams = [userId, itemId]
    const queryString = `
      DELETE FROM items
      WHERE user_id = $1
      AND id = $2
    `;

    if (!userId) {
      return res.redirect('/login');
    }

    db
      .query(queryString, queryParams)
      .then(()=> {
        return res.redirect('/listings');
      })
      .catch(err => console.log('Error: ', err.stack));
  });

  return router;
};

