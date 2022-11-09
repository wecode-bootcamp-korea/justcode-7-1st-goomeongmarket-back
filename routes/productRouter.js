const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

//main에 제품 전부 보내기
router.get("/main", controller.getProducts);
//카테고리 별로 제품 보내기
router.post("/category/:categoryId", controller.getProductsByCategory);
//new 보내기
router.post("/new", controller.getNewProduct);

// 제품별로 보내기
router.post("/goods/:productId", controller.product);
//신상품 순으로 보내기930125
router.get("/newproduct", controller.LineUpToNew);
//알뜰제품 순으로 보내기
router.get("/cheapproduct", controller.LineUpToCheap);
//상세 페이지 밑 리뷰
router.get("/review/:productId", controller.getReviewByProduct);
//주문내역 보내기-----------------------------------------------------다시 살펴봐야 함
router.post("/order", controller.orderProduct);
router.post("/best", controller.getProducts);

module.exports = router;
