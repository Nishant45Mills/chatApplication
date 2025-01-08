const express = require("express");
const { messageController } = require("../controllers");
const verifyToken = require("../middlewares/VerifyToken");
const router = express.Router();

router.use(verifyToken)

router.route("/").post(messageController.sendMessage);
router.route("/:chatId").get(messageController.fetchMessage);

module.exports = router