// const bcrypt = require("bcryptjs");
// const salt = bcrypt.genSaltSync();
// const jwt = require("jsonwebtoken");
// const secret_key = process.env.SECRET_KEY;

const productModel = require("../models/productDao");
//-------------------------------------------------------------------------------

const getProducts = async () => {
  const result = await productModel.getProducts;
  return result;
};
// sorted_type = 신상품순, 판매량순, 해택순, 낮은 가격순, 높은 가격순
//신상품 순 -> create , 판매량 순 -> odered_product table 에서 ordered_number sum , 낮은 가격 순 ->  price , 높은 가격 순 -> -낮은가격순?
//products, ordered_product
// select products.*, IT.image_url, OT.* from products left JOIN (select product_id, sum(ordered_number) from ordered_products group by product_id) as OT on products.id = ot.product_id left join (select * from product_images order by created_at desc limit 1) AS IT  on products.id = IT.product_id
// filters = 브랜드, 가격, 해택
const getProductsByCategory = async (category_id, sorted_type, filters) => {
  const result = await productModel.getProductsByCategory(
    category_id,
    sorted_type,
    filters
  );
  if (!result.length) {
    const error = new Error("REQUESTED CATEGORY DOES NOT EXIST.");
    error.status = 400;
    throw error;
  } else {
    return result;
  }
};

const productData = async (product_id) => {
  const result = await productModel.productData(product_id);
  if (!result.length) {
    const error = new Error("REQUESTED PRODUCT DOES NOT EXIST.");
    error.status = 400;
    throw error;
  } else {
    return result;
  }
};

const LineUpToNew = async () => {
  const result = await productModel.LineUpToNew;
  return result;
};

const getReviewByProduct = async (product_id) => {
  const result = await productModel.getReviewByProduct(product_id);
  if (!result.length) {
    const error = new Error("REQUESTED CATEGORY DOES NOT EXIST.");
    error.status = 400;
    throw error;
  } else {
    return result;
  }
};
module.exports = {
  getProducts,
  getProductsByCategory,
  productData,
  LineUpToNew,
  getReviewByProduct,
};
