const express = require("express");
const { auth } = require("../controllers");
const validation = require("../middlewares/validation");
const { authValidation } = require("../validations");
const app = express();

app.post("/register", validation(authValidation.register), auth.register);
app.post("/login", validation(authValidation.login), auth.login);

module.exports = app;
