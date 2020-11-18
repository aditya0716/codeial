const express = require("express");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.use(express.static("./assets"));

// extract style & script from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// use express router
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Not able to start server:${err}`);
    return;
  }
  console.log(`Server running on port number:${port}`);
});
