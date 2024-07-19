const express = require("express");
const { message } = require("../controllers");
const { verifyToken } = require("../middlewares/verifyToken");
const app = express();

app.use(verifyToken);

app.post("/", message.sendMessage);
app.get("/:chatId", message.getAllMessage);

module.exports = app;
