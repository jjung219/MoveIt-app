const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = req.session['user_id'];
    let templateVars = { user: userId, items: {} };

    const queryString = `
      SELECT *
      FROM items
      WHERE user_id = $1;
    `;
    const queryParams = [userId];
    console.log(req.session)

    if (!userId) {
      return res.redirect('/login');
    }

    db
      .query(queryString, queryParams)
      .then(result => {
        const items = result.rows;
        for (item of items) {
          templateVars.items[item.id] = item;
        }
        return res.render('my-listings', templateVars);
      })
      .catch(err => console.log('Error: ', err.stack));

  });

  return router;
};


//Only render items of the user that is logged in
//Remove button needs to only delete items if the user id matches the user_id of the items

// Edge Cases:
// if userId is not present
