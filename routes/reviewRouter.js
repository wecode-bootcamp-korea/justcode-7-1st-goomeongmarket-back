const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");

router.get("/myreviewlist", reviewController.myReviewList);

module.exports = router;
