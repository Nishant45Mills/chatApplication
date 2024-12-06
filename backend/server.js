const express = require("express");
const chats = require("./Dummy/data");
const dbConnect = require("./config/db");
const colors = require("colors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
dbConnect();

app.get("/", (req, res) => {
  res.send("working fine");
});

app.get("/chats", (req, res) => {
  res.send(chats);
});

app.listen(PORT, () => {
  console.log(`server running on port no: ${PORT}`.green.bold);
});