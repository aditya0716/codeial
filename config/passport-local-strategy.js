const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

//authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", //which is unique
    },
    function (email, password, done) {
      //done is inbuilt to passport
      //find user and establish identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("Error in finding user");
          return done(err);
        }
        if (!user || user.password != password) {
          console.log("Invalid Username/Password");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

//serialising the user to decide which key is to be kept in the cookies

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user");
      return done(err);
    }
    return done(null, user);
  });
});

//check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
  //if user is signed in, then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }
  //if user is not signed in
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contains current signed in user from the session cookie and we r just sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
