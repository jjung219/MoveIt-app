const express = require('express');
const router  = express.Router();

app.get('/', (req, res) =>{
    res.send('hello')
  }
);

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log(req.body)
    res.send("Hello")
  });
  return router;
};
