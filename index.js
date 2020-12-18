const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const user = require("./models/user");

//used for session cookie
const session = require("express-session");

const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo")(session);

const sassMiddleware = require("node-sass-middleware");

const flash = require("connect-flash");

const customMware = require("./config/middleware");

// app.use(
//   sassMiddleware({
//     src: "./assets/scss",
//     dest: "./assets/css",
//     debug: true,
//     outputStyle: "extended",
//     prefix: "/css",
//   })
// );

app.use(express.urlencoded());

app.use(cookieParser());

app.use(expressLayouts);

app.use(express.static("./assets"));

// extract style & script from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//mongo store is used to store session-cookie in the db
app.use(
  session({
    name: "codeial",
    //change secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false, // if user is not signed in(identity is not established) dont save data
    resave: false, //if session data is not overwritten if it is not changed
    cookie: {
      maxAge: 1000 * 60 * 100, // in milliseconds if user i idle cookie is destroyed
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Not able to start server:${err}`);
    return;
  }
  console.log(`Server running on port number:${port}`);
});
