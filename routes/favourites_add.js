const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/favourites", (req, res) => {
    const userId = req.session['user_id'];
    // const itemId = req;
    console.log(userId)
    // console.log(itemId)


  })
  return router
}
