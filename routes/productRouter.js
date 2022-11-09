const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

//main에 제품 전부 보내기
router.get("/main", controller.getProducts);
//카테고리 별로 제품 보내기
router.post("/category/:categoryId", controller.getProductsByCategory);
//new 보내기
router.post("/new", controller.getNewProduct);
router.post("/best", controller.getBsetProduct);
router.post("/best", controller.getBsetProduct);

// 제품별로 보내기
router.post("/goods/:productId", controller.product);
//주문내역 보내기-----------------------------------------------------다시 살펴봐야 함
router.post("/order", controller.orderProduct);
//상세 페이지 밑 리뷰
router.get("/review/:productId", controller.getReviewByProduct);

module.exports = router;
