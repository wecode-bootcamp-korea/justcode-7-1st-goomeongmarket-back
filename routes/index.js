const express = require("express");

// const userRouter = require("../controllers/userController");
const productRouter = require("./productRouter");
// const cartRouter = require("./cartRouter");

const router = express.Router();

// router.use(userRouter);
router.use("/products", productRouter);
// router.use("/cart", cartRouter);

module.exports = router;
