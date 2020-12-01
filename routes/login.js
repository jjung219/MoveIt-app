const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("login");
  });
  const getUserwithEmail = function (email) {
    return db.query(`SELECT * FROM users WHERE email=$1`, [email])
      .then(res => res.rows[0].email)
      .catch(err => console.log(err));
  }

  const checkUserAuth = function(name,email,password){
 return db.query(`SELECT * FROM users WHERE name=$1 AND email=$2 AND password= $3`,[name,email,password])
 .then(user=>user.rows[0])
 .catch(err=>console.log(err));
  }

  router.post("/",(req,res)=>{
const {name,email,password}  = req.body;
//  console.log(name,email,password)
 checkUserAuth(name,email,password)
.then(user=>{
if(!user){
  res.send("Invalid details")
}else{
  getUserwithEmail(email)
  .then(userId=>{
    req.session['user_id'] = userId;
    res.redirect("/new")
  })
}
  });
});
  return router;
}

