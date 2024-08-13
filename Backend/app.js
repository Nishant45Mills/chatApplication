const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandle");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, { cors: { origin: "*" } });

app.use(cookieParser());

app.use(cors());

app.use(bodyParser.json());

app.use("/", routes);

app.use(errorHandler);

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("sendMessage", (msg) => {
    io.emit("message", msg);
  });
});

module.exports = { app, server };
