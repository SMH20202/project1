const express = require("express");
const app = express();
const debug = require("debug")("app:main");
const dbdebug = require("debug")("db:main");
const router = require("./src/routes");
const mongoose = require("mongoose");
const config = require("config");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api", router);

app.use((req, res) => {
  res.status(404).send("This API does not exist");
});

mongoose
  .connect(config.get("database.address"))
  .then(() => dbdebug("connect to database"))
  .catch((err) => dbdebug(`couldn't connect to database (${err})`));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => debug(`listening on port ${PORT}`));
