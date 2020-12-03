const express = require('express');
const router  = express.Router();
module.exports = (db) => {

  router.get("/",(req,res)=>{
    res.send("dhfkhskd")
  })
  return router;
}



const messages = function(sender_id,reciever_id){
  return  db.query(`SELECT * FROM messages WHERE sender_id=$1 AND reciever_id=$2`,[sender_id,reciever_id])
   .then(res=> res.rows[0].content)
     .catch(err=>console.log.log(err));
   }
