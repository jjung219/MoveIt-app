/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("register");
  });

  const getUserwithEmail = function (email) {
    return db.query(`SELECT * FROM users WHERE email=$1`, [email])
      .then(res => res.rows[0].email)
      .catch(err => console.log(err));
  }
  const addNewUser = function (name, email, password) {
    return db.query(`INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *`, [name, email, password])
      .then(user => user.rows[0].id)
      .catch(err => console.log(err));
  }

  router.post("/", (req, res) => {
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;
    // console.log(userName,userEmail,userpassword);
    getUserwithEmail(userEmail)
      .then(user => {
        if (!user) {
          addNewUser(userName, userEmail, userPassword)
            .then(userId => {
              console.log(`test:${userId}`);
              req.session['user_id'] = userId;
              console.log(req.session);
              res.redirect("/")
            });
        } else {
          res.send("user already exist")
        }
      });
  });
  return router;
};

//.get ---'/'
// .get ---'/register'
// .post ----'/register'
// .get ---'/login'
// .post----'/login'
// .get ----'/listings'------get all the listings
// .post ---'/listings'------create a new listing
// .get ----'/listings/:user_id------listings of a particular userId
// .get ----'/listings/:item_id'------particular listing
// .get ----'/listings/favourites'------ view favourite listings
// .post --- '/listings/item_id/delete'---------delete a particular listing
// .post ---'/listings/item_id/edit'------edit a  listing
// .get---'/listings/new'---------go to a form to create a new listing
// .post ---'/logout'-----------logout
