const express = require("express");
const { userController } = require("../controllers");
const verifyToken = require("../middlewares/VerifyToken");
const  upload  = require("../middlewares/Multer");

const router = express.Router();
router.route("/upload").post(upload.single("file"),userController.uploadImage);

router.use(verifyToken);
router.route("/").get(userController.getUser);

module.exports = router;
