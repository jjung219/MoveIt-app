const express = require('express');
const router  = express.Router();
const initHelpers = require('../helpers.js');
module.exports = (db) => {
  const helpers = initHelpers(db);

  router.get("/",(req,res)=>{
    const reciever_id = req.session.user_id;
    const templateVars = { user: reciever_id};
  helpers.messages(reciever_id)
   .then(message=>{
     res.render("user_messages", templateVars);
   })
  })
  return router;
}


