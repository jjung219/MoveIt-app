
module.exports = (db) => {
  const getUserwithEmail = function (email) {
  return db.query(`SELECT * FROM users WHERE email=$1`, [email])
    .then(res => res.rows[0])
    .catch(err => console.log(err));
}

const checkUserAuth = function(name,email,password){
  return db.query(`SELECT * FROM users WHERE name=$1 AND email=$2 AND password= $3`,[name,email,password])
  .then(user=>user.rows[0])
  .catch(err=>console.log(err));
   }
   const addNewUser = function (name, email, password) {
    return db.query(`INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *`, [name, email, password])
      .then(user => user.rows[0].id)
      .catch(err => console.log(err));
  }
}

