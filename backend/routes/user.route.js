const express = require("express");
const { userController } = require("../controllers");
const verifyToken = require("../middlewares/VerifyToken");
const router = express.Router();

router.use(verifyToken);

router.route("/").get(userController.getUser);

module.exports = router;
