const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = req.session['user_id'];
    let templateVars = { user: {}, items: {} };


    const queryString = `
      SELECT users.name as user, items.*
      FROM items
      FULL JOIN users ON items.user_id = users.id
      WHERE items.user_id = $1;
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
        templateVars.user['name'] = items[0].user;
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

// const userId = req.session['user_id'];
// const queryString = `SELECT * FROM users WHERE id = $1`

// db
//   .query (queryString, [userId])
//   .then(result => {
//     const userInfo = result.rows[0];
//     templateVars = {user: userInfo}
//     console.log(userInfo)
//     return res.render("search", templateVars);
//   })
//   .catch(err => console.log('Error: ', err.stack))
