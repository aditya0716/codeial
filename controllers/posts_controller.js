const Post = require("../models/post");
const comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    return res.redirect("/");
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      post.remove();
      await comment.deleteMany({ post: req.params.id });
      return res.redirect("/");
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log("Error", err);
  }
};
