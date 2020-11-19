const User = require("../models/user");

module.exports.profile = function (req, res) {
  
  return res.render("user_profile", { title: "HOME" });
};

//render the sign up page
module.exports.signup = function (req, res) {
  return res.render("user_sign_up", { title: "Codeial | Sign Up" });
};

//render the sign in page
module.exports.signin = function (req, res) {
  return res.render("user_sign_in", { title: "Codeial | Sign In" });
};

//get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.new_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }
    console.log(req.body);

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in finding user in signing up");
          return;
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

//get the sign in data
module.exports.createSession = function (req, res) {
  //TODO LATER
};
