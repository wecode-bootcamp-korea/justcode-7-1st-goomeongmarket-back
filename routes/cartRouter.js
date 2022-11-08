const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");

const cartController = require("../controllers/cartController");

router.post("/update", cartController.cartUpdate);
router.get("/list", cartController.cartList);

module.exports = router;
