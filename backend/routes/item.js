const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item");
const { auth } = require("../middleware/auth");

router.get("/list", itemController.list);
router.get("/userInfoWithcoupons", auth, itemController.userInfoWithcoupons);

module.exports = router;
