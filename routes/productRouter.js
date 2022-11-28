const express = require("express");
const router = express.Router();
// TODO 6 - productController 이름 구체화
const controller = require("../controllers/productController");


// TODO 7 - same entity - same router - same function

//main에 제품 전부 보내기
router.get("", controller.getProducts);

//TODO 10 - if신제품 생성하기 기능을 만든다면 아래 url 이용
//router.post("", contorller.createProduct)

//알뜰제품 순으로 보내기
// router.post("", controller.LineUpToCheap);

// MEMO - query string이 있다고 해도, 같은 REST API임.
// '/products'
// '/products?ordering=price'
// '/?{key}={value}'

//카테고리 별로 제품 보내기
router.post("/category/:categoryId", controller.getProductsByCategory);

//new 보내기
router.post("/new", controller.getNewProduct);
//router.get('/products?isNew=true')

// 제품별로 보내기
// TODO - 8 'products/4' 
router.get("/:productId", controller.getProductDetailData);

//상세 페이지 밑 리뷰
// TODO - 9 
router.get("/:productId/reviews", controller.getReviewByProduct);
// 'products/8/reviews'
// 'products/reveiw/8'


// TODO - 11 - order router 분리
//주문내역 보내기-----------------------------------------------------다시 살펴봐야 함
router.post("/order", controller.orderProduct);
// 주문 -> CRUD (Create, Read, Update, Delete)

// TODO -12 get method
router.post("/best", controller.getBsetProduct);


module.exports = router;
