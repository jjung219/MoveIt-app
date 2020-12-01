
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    res.send("logout ok!")
  });
  return router;
};
