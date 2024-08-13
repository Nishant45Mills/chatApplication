const express = require("express");
const { chat } = require("../controllers");
const { verifyToken } = require("../middlewares/verifyToken");
const router = express();

router.use(verifyToken);

router.route("/").post(chat.createChat).get(chat.fetchChat);
router.route("/:id").get(chat.getChatById);
router.route("/group").post(chat.createGroupChat);
router.route("/group/status").patch(chat.updateStatus);
router.route("/group/:id").post(chat.addToGroup).patch(chat.removeFromGroup)
router.route("/rename/:id").put(chat.renameGroup);

module.exports = router;
