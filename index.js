const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const app = express();
const port = 7777;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/hash", routes);

app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${port}!`)
);
module.exports = app;
