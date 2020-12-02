const express = require('express');
const router = express.Router();


module.exports = (db) => {

  router.get("/:id/",(req,res)=>{
    const userId = req.session['user_id'];
    const reciever_id = req.params.id;
    const templateVars = { user: userId, reciever_id:reciever_id};
    res.render("message", templateVars);
  })

  const messages = function(sender_id,reciever_id){
 return  db.query(`SELECT * FROM messages WHERE sender_id=$1 AND reciever_id=$2`,[sender_id,reciever_id])
  .then(res=> res.rows[0].content)
    .catch(err=>console.log.log(err));
  }

  const newMessage = function(message,sender_id,reciever_id){
    return db.query(`INSERT INTO messages(sender_id,reciever_id,content) VALUES($1,$2,$3) RETURNING *`,[sender_id,reciever_id,message])
    .then(res=>res.rows[0])
    .catch(err=>console.log(err));
  }

  router.post("/:id/",(req,res)=>{
    console.log(req.body)
    const reciever_id = req.params.id;
    const content = req.body.content;
    const sender_id = req.session.user_id;
    newMessage(content,sender_id,reciever_id)
    .then(message=>{
      console.log(message);
      res.send("success");
    })
  })
  return router;
}
