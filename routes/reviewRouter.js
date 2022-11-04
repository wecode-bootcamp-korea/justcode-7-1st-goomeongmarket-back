const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");

router.get("/myreviewlist", reviewController.myReviewList);

module.exports = router;

/*
1. 제품에서 해당제품 리뷰 볼 수 있게 하기? -----> product에서 해야함
2. 내가 쓴 리뷰 다 볼 수 있게 하기 -> 로그인만 하면 다 볼 수 있게
3. 리뷰 작성하기 -> 
4. 리뷰 수정? ->
5. 리뷰 삭제 -> 
6.
*/
