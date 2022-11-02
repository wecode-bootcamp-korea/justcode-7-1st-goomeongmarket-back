const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

//main에 제품 전부 보내기
router.get("/main", controller.getProducts);
//카테고리 별로 제품 보내기
router.post("/category/:categoryId", controller.getProductsByCategory);
// 제품별로 보내기
router.post("/goods/:productId", controller.product);
//신상품 순으로 보내기
router.get("/new", controller.LineUpToNew);
module.exports = router;

/*


*/
