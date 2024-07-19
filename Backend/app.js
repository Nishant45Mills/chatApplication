const express = require("express");
const chats = require("./Dummy/data");
const cors = require("cors");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandle");

const app = express();

app.use(cookieParser());

app.use(cors());

app.use(bodyParser.json());

app.use("/", routes);

app.use(errorHandler);

module.exports = app;
