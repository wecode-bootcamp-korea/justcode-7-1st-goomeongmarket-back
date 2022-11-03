const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");

router.get("/cartlist", cartController.cartList);

module.exports = router;
