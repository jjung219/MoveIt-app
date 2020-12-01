
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = req.session['user_id'];
    const queryString = `SELECT * FROM users WHERE id = $1`

    db
      .query (queryString, [userId])
      .then(result => {
        const userInfo = result.rows[0];
        templateVars = {user: userInfo}
        console.log(userInfo)
        return res.render("search", templateVars);
      })
      .catch(err => console.log('Error: ', err.stack))
  });
  return router;
};
