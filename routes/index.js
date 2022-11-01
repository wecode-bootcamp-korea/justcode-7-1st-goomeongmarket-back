const express = require("express");

const userRouter = require("./userRouter");
// const productRouter = require("../controllers/productController");
const cartRouter = require("./cartRouter");

const router = express.Router();

router.use("/user", userRouter);
// router.use(productRouter);
router.use("/cart", cartRouter);

module.exports = router;
