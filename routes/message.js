const express = require('express');
const router = express.Router();
const initHelpers = require('../helpers.js');


module.exports = (db) => {
  const helpers = initHelpers(db);
  router.get("/:id/",(req,res)=>{
    const userId = req.session['user_id'];
    const reciever_id = req.params.id;
    const templateVars = { user: userId, reciever_id:reciever_id};
    res.render("message", templateVars);
  })



  router.post("/:id/",(req,res)=>{
    console.log(req.body)
    const reciever_id = req.params.id;
    const content = req.body.content;
    const sender_id = req.session.user_id;
    helpers.newMessage(content,sender_id,reciever_id)
    .then(message=>{
      console.log(message);
      res.send("success");
    })
  })
  return router;
}
