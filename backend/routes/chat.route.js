const express = require("express");
const verifyToken = require("../middlewares/VerifyToken");
const { chatController } = require("../controllers");
const router = express.Router();

router.use(verifyToken);

router.route("/:userId").post(chatController.createChat);

module.exports = router;
