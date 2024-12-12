const express = require("express");
const chats = require("./Dummy/data");
const dbConnect = require("./config/db");
const colors = require("colors");
const route = require("./routes/user");
const ErrorHandler = require("./middlewares/ErrorHandler");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
dbConnect();

app.use(cors());
app.use(express.json());
app.use(route);
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`server running on port no: ${PORT}`.green.bold);
});
