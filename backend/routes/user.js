const express = require("express");
const { registerUser, loginUser, getUser } = require("../controllers/user");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/user").get(getUser);

module.exports = router;
