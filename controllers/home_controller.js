//home is the name module.exports object
module.exports.home = function (req, res) {
  return res.render("home", { title: "HOME" });
};
