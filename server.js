// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
var cookieSession = require('cookie-session');
const morgan     = require('morgan');
var cookieSession = require('cookie-session')
const { Pool, Client } = require('pg')
// PG database client/connection setup
// const { Pool } = require('pg');
// const dbParams = require('./lib/db.js');
// const db = new Pool(dbParams);
// db.connect();

const db = new Pool({
  user: 'labber',
  host: 'localhost',
  database: 'midterm',
  password: 'labber',
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
const widgetsRoutes = require("./routes/widgets");
const searchRoutes = require("./routes/search");
const searchListingRoutes = require("./routes/search-listing");
const myListingsRoutes = require("./routes/my-listings");
const newRoutes = require("./routes/new");
const removeListingRoutes = require("./routes/my-listings-remove");
const favouritesRoutes = require("./routes/favourites");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// app.use("/api/register", RegisterRoutes(db));
// app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/search", searchRoutes(db));
app.use("/api/", searchListingRoutes(db));
app.use("/api/listings", myListingsRoutes(db));


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/register", RegisterRoutes(db));
app.use("/favourites", favouritesRoutes(db));
app.use("/widgets", widgetsRoutes(db));
app.use("/new",newRoutes(db));
// Note: mount other resources here, using the same pattern above
app.use("/api/listings/", removeListingRoutes(db));


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  let templateVar = {};
  let items;
  // res.render('index')
  db
  .query('SELECT * FROM items')
  .then(result => {
    items = (result.rows);
    templateVar.itemsArr = items;
    res.render('index', templateVar)
    // console.log(templateVar)
  })
  .catch(e => console.log(e.stack))
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


app.get("/listings", (req, res) => {

  res.render("listings");
});

app.get("/login", (req, res) => {

  res.render("login");
});
