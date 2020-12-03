const express = require('express');
const router = express.Router();
const initHelpers = require('../helpers.js');
module.exports = (db) => {
  const helpers = initHelpers(db);

  router.get("/", (req, res) => {
    const reciever_id = req.session.user_id;
    if (reciever_id) {
      helpers.receivedMessages(reciever_id)
        .then(message => {
          // console.log(message);
          res.render("user_messages", { user: reciever_id, message: message.content, sender_email: message.sender_email, item_name: message.name })
        })
        .catch(err => console.log(err));
    } else {
      res.send("<h1>Please Login</h1>")
    }
  });
  return router;
}


