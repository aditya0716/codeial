//home is the name module.exports object
module.exports.home = function (req, res) {
  console.log(req.cookies);
  res.cookie("cookie_id", 25);
  return res.render("home", { title: "HOME" });
};
