const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("./resources"));

console.log("__DIRNAME = %s\n", __dirname);

app.get("/", (req, res) => {
  res.render("index");
});

const server = app.listen(3000, () => {
  let host = server.address().address;
  let port = server.address().port;
  if (host === "::")
  {
    host = "localhost";
  }
  console.log("Server is listening at http://%s:%s", host, port);
});
