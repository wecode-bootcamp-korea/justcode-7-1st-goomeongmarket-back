// const bcrypt = require("bcryptjs");
// const salt = bcrypt.genSaltSync();

const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const productModel = require("../models/productDao");
//-------------------------------------------------------------------------------

const getProducts = async () => {
  const result = await productModel.getProducts();
  return result;
};
// sorted_type = 신상품순, 판매량순, 해택순, 낮은 가격순, 높은 가격순
//신상품 순 -> create , 판매량 순 -> odered_product table 에서 ordered_number sum , 낮은 가격 순 ->  price , 높은 가격 순 -> -낮은가격순?
// filters = 브랜드, 가격, 해택
const getProductsByCategory = async (category_id, sorted_by) => {
  const result = await productModel.getProductsByCategory(
    category_id,
    sorted_by
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

const orderProduct = async (token, product_id, ordered_number) => {
  const user = jwt.verify(token, jwtSecret);
  const user_id = user.id;
  const result = await productModel.orderProduct(
    user_id,
    product_id,
    ordered_number
  );
  return result;
};

const LineUpToCheap = async (sorted_by) => {
  const result = await productModel.LineUpToCheap(sorted_by);
  console.log(result);
  if (!result.length) {
    const error = new Error("REQUESTED CATEGORY DOES NOT EXIST.");
    error.status = 400;
    throw error;
  } else {
    return result;
  }
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

const getNewProduct = async (category_id, sorted_by) => {
  const result = await productModel.getNewProduct(category_id, sorted_by);
  if (!result.length) {
    const error = new Error("REQUESTED CATEGORY DOES NOT EXIST.");
    error.status = 400;
    throw error;
  } else {
    return result;
  }
};

const getBsetProduct = async (category_id, sorted_by) => {
  const result = await productModel.getBsetProduct(category_id, sorted_by);

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
  LineUpToCheap,
  orderProduct,
  getReviewByProduct,
  getNewProduct,
  getBsetProduct,
};
