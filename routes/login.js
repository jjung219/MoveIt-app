const express = require('express');
const router = express.Router();
const initHelpers = require('../helpers.js');

module.exports = (db) => {
  const helpers = initHelpers(db);
  console.log({helpers});
  router.get("/", (req, res) => {
    const userId = req.session['user_id'];
    const templateVars = { user: userId };

    if (userId) {
      return res.redirect("/");
    }

    res.render("login", templateVars);
  });
  const getUserwithEmail = function (email) {
    return db.query(`SELECT * FROM users WHERE email=$1`, [email])
      .then(res => res.rows[0])
      .catch(err => console.log(err));
  }

  const checkUserAuth = function(email,password){
 return db.query(`SELECT * FROM users WHERE email=$1 AND password= $2`,[email,password])
 .then(user=>user.rows[0])
 .catch(err=>console.log(err));
  }

  router.post("/",(req,res)=>{
const {email,password}  = req.body;
//  console.log(name,email,password)
 checkUserAuth(email,password)
.then(user=>{
if(!user){
  res.send("Invalid details")
}else{
  helpers.getUserwithEmail(email)
  .then(user=>{
    req.session['user_id'] = user.id;
    res.redirect("/")
  })
}
  });
});
  return router;
}

