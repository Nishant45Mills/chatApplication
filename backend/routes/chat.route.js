const express = require("express");
const verifyToken = require("../middlewares/VerifyToken");
const { chatController } = require("../controllers");
const router = express.Router();

router.use(verifyToken);

router.route("/").get(chatController.fetchChat).post(chatController.createChat);
router.route("/group").post(chatController.createGroupChat);
router.route("/renameGroup").patch(chatController.renameGroup);

module.exports = router;
