// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
var cookieSession = require('cookie-session');
const morgan = require('morgan');
var cookieSession = require('cookie-session')
const { Pool } = require('pg')
// PG database client/connection setup
// const { Pool } = require('pg');
// const dbParams = require('./lib/db.js');
// const db = new Pool(dbParams);
// db.connect();

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
})
db.connect().then(() => console.log('db conected'));

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))
app.use(bodyParser.json());
app.use(express.static("public"));



// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const RegisterRoutes = require("./routes/register");
const searchRoutes = require("./routes/search");
const searchListingRoutes = require("./routes/search-listing");
const myListingsRoutes = require("./routes/my-listings");
const newRoutes = require("./routes/new");
const removeListingRoutes = require("./routes/my-listings-remove");
const favouritesRoutes = require("./routes/favourites");
const markItemRoutes = require("./routes/my-listings-mark-item");
const logoutRoutes = require("./routes/logout");
const removeMessageRoutes = require("./routes/user-messages-remove");
const loginRoutes = require("./routes/login");
const newMessageRoutes = require("./routes/message");
const messageRoutes = require("./routes/user_messages");


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/register", RegisterRoutes(db));
app.use("/favourites", favouritesRoutes(db));
app.use("/new", newRoutes(db));
app.use("/login", loginRoutes(db));
// Note: mount other resources here, using the same pattern above
app.use("/listings", removeListingRoutes(db));
app.use("/listings", markItemRoutes(db));
app.use("/logout", logoutRoutes(db));
app.use("/message", newMessageRoutes(db));
app.use("/messages", messageRoutes(db));
app.use("/messages", removeMessageRoutes(db));
app.use("/search", searchRoutes(db));
app.use("/", searchListingRoutes(db));
app.use("/listings", myListingsRoutes(db));




// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  let items;
  let userId;
  let templateVar = {};
  db
    .query('SELECT * FROM items')
    .then(result => {
      userId = req.session['user_id']
      items = (result.rows);
      templateVar = { itemsArr: items, user: userId }
      queryString = `SELECT item_id, users.*
    FROM favorites
    JOIN users ON user_id = users.id
    where favorites.user_id = $1
    `
      db.query(queryString, [userId])
        .then(result => {
          favouritesIds = result.rows
          templateVar.favourited = false
          templateVar.favIds = favouritesIds.map(itemFav => itemFav.item_id)
          // console.log(templateVar)
          res.render('index', templateVar)
        })
    })
    .catch(e => console.log(e.stack))

});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


