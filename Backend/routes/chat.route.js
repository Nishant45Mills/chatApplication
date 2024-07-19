const express = require("express");
const { chat } = require("../controllers");
const { verifyToken } = require("../middlewares/verifyToken");
const router = express();

router.use(verifyToken);

router.route("/").post(chat.createChat).get(chat.fetchChat);
router.route("/:id").get(chat.getChatById);
router.route("/group").post(chat.createGroupChat);
router.route("/group/:id").post(chat.addToGroup).delete(chat.removeFromGroup).put(chat.renameGroup);

module.exports = router;
