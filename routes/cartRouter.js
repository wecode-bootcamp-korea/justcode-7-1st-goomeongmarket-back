const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");

router.post("/update", cartController.cartUpdate);
router.get("/list", cartController.cartList);

module.exports = router;
