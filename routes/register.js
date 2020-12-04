/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const initHelpers = require('../helpers.js');

module.exports = (db) => {
  const helpers = initHelpers(db);
  router.get("/", (req, res) => {
    const userId = req.session['user_id'];
    const templateVars = { user: userId };

    res.render("register", templateVars);
  });

  router.post("/", (req, res) => {
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;
    // console.log(userName,userEmail,userpassword);
    helpers.getUserwithEmail(userEmail)
      .then(user => {
        if (!user) {
         helpers.addNewUser(userName, userEmail, userPassword)
            .then(userId => {
              console.log(`test:${userId}`);
              req.session.user_id = userId;
              console.log(req.session);
              res.redirect("/");
            });
        } else {
          res.send("<h1>user already exist</h1>");
        }
      });
  });
  return router;
};

