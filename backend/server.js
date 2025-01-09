const express = require("express");
const chats = require("./Dummy/data");
const dbConnect = require("./config/db");
const colors = require("colors");
const route = require("./routes/index");
const ErrorHandler = require("./middlewares/ErrorHandler");
const app = express();
const { createServer } = require("node:http");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
dbConnect();
const { Server } = require("socket.io");
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});

app.use(cors());
app.use(express.json());
app.use(route);
app.use(ErrorHandler);

server.listen(PORT, () => {
  console.log(`server running on port no: ${PORT}`.green.bold);
});
