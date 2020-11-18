const express = require("express");
const app = express();
const port = 8000;
app.listen(port, function (err) {
  if (err) {
    console.log(`Not able to start server:${err}`);
    return;
  }
  console.log(`Server running on port number:${port}`);
});
