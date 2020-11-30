const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("new");
  });

  const addListing = function (listing) {
    return db.query(`INSERT INTO items(name,description,photo_url,price,condition) VALUES($1,$2,$3,$4,$5) RETURNING *`, [listing.name, listing.description, listing.photo_url, listing.price, listing.condition])
      .then(res => res.rows[0])
      .catch(err => console.log(err));
  }
  router.post("/", (req, res) => {
    console.log(req.session)
    const userId = req.session.user_id;
    console.log(userId)
    addListing({ ...req.body, user_id: userId })
      .then(listing => {
        res.send(listing)
      })
      .catch(err => console.log(err));
  })
  return router;
}

