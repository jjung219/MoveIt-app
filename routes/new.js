const express = require('express');
const router = express.Router();

module.exports = (db) => {
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

  const addListing = function (listing) {
    // console.log(`listingobject `)
    // console.log(listing)
    return db.query(`INSERT INTO items(name,description,photo_url,price,condition,user_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,[listing.name, listing.description, listing.photo_url, listing.price, listing.condition,listing.user_id])
      .then(res => res.rows[0])
      .catch(err => console.log(err));

  }

  router.post("/", (req, res) => {
    const userId = req.session.user_id;
     if(userId){
    //  console.log(req.session);
    addListing({...req.body, user_id: userId })
      .then(() => {
        res.redirect("/listings")
      })
      .catch(err => console.log(err));
    }else{
      res.redirect("/login");
    }
  });
  return router;
}

