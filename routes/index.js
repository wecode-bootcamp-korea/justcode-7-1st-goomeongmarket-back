const express = require("express");

// Entity 기준으로 Router 분리 + RESTful API rule good! 
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const cartRouter = require("./cartRouter");
const likeRouter = require("./likeRouter");
const reviewRouter = require("./reviewRouter");

const router = express.Router();

// TODO 3 - router 단수/복수 통일
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/cart", cartRouter);
router.use("/review", reviewRouter);
router.use("/like", likeRouter);

module.exports = router;
