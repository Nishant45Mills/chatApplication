const express = require("express");
const { user } = require("../controllers");
const { verifyToken } = require("../middlewares/verifyToken");
const app = express();

app.use(verifyToken);

app.get("/", user.getUser);

module.exports = app;
