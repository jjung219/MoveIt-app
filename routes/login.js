const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("login");
  });

  router.post("/",(req,res)=>{
const {name,email,password}  = req.body;
console.log(name,email,password)
  });
  return router;
}

