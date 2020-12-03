const express = require('express');
const router = express.Router();
const initHelpers = require('../helpers.js');

module.exports = (db) => {
  const helpers = initHelpers(db);
  router.get("/", (req, res) => {
    const userId = req.session['user_id'];
    const queryString = `SELECT * FROM users WHERE id = $1`

    db
      .query (queryString, [userId])
      .then(result => {
        const userInfo = result.rows[0];
        templateVars = {user: userInfo}
        return res.render("new", templateVars);
      })
      .catch(err => console.log('Error: ', err.stack))
  });

  router.post("/", (req, res) => {
    const userId = req.session.user_id;
     if(userId){
    //  console.log(req.session);
    helpers.addListing({...req.body, user_id: userId })
      .then(listing => {
        res.redirect("/listings")
      })
      .catch(err => console.log(err));
    }else{
      res.redirect("/login");
    }
  });
  return router;
}

