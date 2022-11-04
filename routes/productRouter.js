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
//상세 페이지 밑 리뷰
router.get("/review/:productId", controller.getReviewByProduct);

module.exports = router;

/*
베스트 : 결제하기 버튼을 클릭 -> 제품id와 수량을 보낸다 -> 받은 정보를 id 별 수량을 합산한다.( `SELECT * FROM (SELECT product_id, sum(주문수량 열 이름) from 테이블이름 group by product_id) AS VT ORDER BY sum(주문수량 열 이름) desc` )
        -> 합산 한 정보를 페이지에 보낸다 -쿼리문->  `select products.*, T.image_url, VT.sum(주문수량 열 이름) from products INNER JOIN (SELECT product_id, sum(주문수량 열 이름) from 테이블이름 group by product_id) AS VT ON products.id = VT.product_id INNER JOIN (select * from product_images order by created_at desc limit 1) AS T ON T.product_id=products.id ORDER BY sum(주문수량 열 이름) desc`

SELECT 기준열의_이름, COUNT(기준열의_이름) from 정보를_포함하는_테이블  INNER JOIN 조인할_테이블 ON 조건_1(category_id = pd.category_id) (그룹화){GROUP BY category_name};

*/
