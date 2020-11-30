const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post ("/:id/delete", (req, res) => {
    const userId = req.session['user_id'];
    console.log(req.params);
    // res.send("delete ok!")

    // const queryString = `
    //   DELETE *
    //   FROM items
    //   WHERE user_id = ${userId}
    //   AND id =
    // `;


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
