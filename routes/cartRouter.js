const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");

const cartController = require("../controllers/cartController");

router.post("/update", validateToken, cartController.cartUpdate);
router.get("/list", validateToken, cartController.cartList);
router.delete("", validateToken, cartController.deleteItemInCart);
router.patch("/quantity", validateToken, cartController.changeItemQuantity);

module.exports = router;
