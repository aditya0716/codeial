const comment = require("../models/comment");
const post = require("../models/post");

module.exports.create = function (req, res) {
  post.findById(req.body.post, function (err, post) {
    if (post) {
      comment.create(
        {
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        },
        function (err, comment) {
          //handle error
          if (err) {
            console.log("error adding comments");
          }
          post.comment.push(comment);
          post.save();
          return res.redirect("/");
        }
      );
    }
  });
};
module.exports.destroy = function (req, res) {
  comment.findById(req.params.id, function (err, comment) {
    if (comment.user == req.user.id) {
      let postId = comment.post;
      comment.remove();
      post.findByIdAndUpdate(
        postId,
        {
          $pull: { comment: req.params.id },
        },
        function (err, post) {
          return res.redirect("back");
        }
      );
    } else {
      return res.redirect("back");
    }
  });
};
