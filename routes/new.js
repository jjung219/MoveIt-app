const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("new");
  });

  router.post("/", (req, res) => {
    const addListing = function (listing) {
      const userId = req.session.user_id;
      return db.query(`INSERT INTO items(user_id, name,description,photo_url,price,condition) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`, [ userId, listing.name, listing.description, listing.photo_url, listing.price, listing.condition])
        .then(res => res.rows[0])
        .catch(err => console.log(err));
    }

    addListing(req.body)
      .then(()=> {
        res.redirect("/api/listings");
      })
      .catch(err => console.log(err));
  })
  return router;
}

