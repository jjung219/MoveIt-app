const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post ("/:id/delete", (req, res) => {
    const userId = req.session['user_id'];
    const itemId = req.params.id;

    const queryParams = [userId, itemId]
    const queryString = `
      DELETE FROM items
      WHERE user_id = $1
      AND id = $2
    `;

    db
      .query(queryString, queryParams)
      .then(()=> {
        return res.redirect('/listings');
      })
      .catch(err => console.log('Error: ', err.stack));
  });

  return router;
};

// app.post("/urls/:shortURL/delete", (req, res) => {
//   const userId = req.session["user_id"];
//   const shortURL = req.params.shortURL;

//   if (urlDatabase[shortURL].userID === userId) {
//     delete urlDatabase[shortURL];
//     res.redirect("/urls");
//   } else {
//     res.redirect("/login");
//   }
// });
