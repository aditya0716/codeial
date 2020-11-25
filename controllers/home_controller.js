//home is the name module.exports object
const post = require("../models/post");
module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // res.cookie("cookie_id", 25);

  // post.find({}, function (err, post) {
  //   return res.render("home", { title: "Codeial | Home", posts: post });
  // });

  //populate the user of each post
  post
    .find({})
    .populate("user")
    .populate({
      path: "comment",
      populate: {
        path: "user",
      },
    })
    .exec(function (err, post) {
      return res.render("home", { title: "Codeial | Home", posts: post });
    });
};
