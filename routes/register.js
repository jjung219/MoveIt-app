/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("register");
  });
  router.post("/",(req,res)=>{
    const {userName,email,password} = req.body;
    console.log(userName,email,password);
  })
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
