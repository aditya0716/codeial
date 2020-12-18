//home is the name module.exports object
const post = require("../models/post");

const user = require("../models/user");

module.exports.home = async function (req, res) {
  // console.log(req.cookies);
  // res.cookie("cookie_id", 25);

  // post.find({}, function (err, post) {
  //   return res.render("home", { title: "Codeial | Home", posts: post });
  // });

  //populate the user of each post
  try {
    let posts = await post
      .find({})
      .populate("user")
      .populate({
        path: "comment",
        populate: {
          path: "user",
        },
      });
    let users = await user.find({});

    return res.render("home", {
      title: "Codeial | Home",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log("Error", err);
  }

  // .exec(function (err, post) {

  //   // console.log(post);
  // });
};
