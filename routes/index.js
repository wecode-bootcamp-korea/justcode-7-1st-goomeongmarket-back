const express = require("express");

const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const cartRouter = require("./cartRouter");
const likeRouter = require("./likeRouter");
const reviewRouter = require("./reviewRouter");

const router = express.Router();

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/cart", cartRouter);
router.use("/review", reviewRouter);
router.use("/like", likeRouter);

module.exports = router;
