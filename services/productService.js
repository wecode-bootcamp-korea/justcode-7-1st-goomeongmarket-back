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

const getProductsByCategory = async (category_id) => {
  const result = await productModel.getProductsByCategory(category_id);
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
