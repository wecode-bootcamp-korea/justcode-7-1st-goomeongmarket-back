const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});
const productservice = require("../services/productService");

//------------------------------------------------------------------------------------

//메인에 전부 보내기
const getProducts = async (req, res) => {
  //토큰 없으면 입장불가?
  try {
    const { token } = req.headers;
    if (!token) {
      throw new Error("ERROR: LOGIN_REQUESTED");
    }
    const result = await productservice.getProducts(token);
    res.status(200).json({ products: result });
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ message: err.message });
  }
};
//카테고리 별로 보내기---------------------------------------------------------------------
const getProductsByCategory = async (req, res) => {
  const category_id = req.params.categoryId;
  const { token } = req.headers;
  console.log(category_id);
  try {
    //로그인 해야 이용가능
    if (!token) {
      throw new Error("ERROR: LOGIN_REQUESTED");
    }

    const result = await productservice.getProductsByCategory(category_id);
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ message: err.message });
  }
};
//제품 하나 보내기-----------------------------------------------------------------------
const product = async (req, res) => {
  const product_id = req.params.productId;
  const { token } = req.headers;
  console.log(product_id);
  try {
    //로그인 해야 이용가능
    if (!token) {
      throw new Error("ERROR: LOGIN_REQUESTED");
    }

    const result = await productservice.productData(product_id);
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ message: err.message });
  }
};
//신상품 순으로 보내기----------------------------------------------------------------------
const LineUpToNew = async (req, res) => {
  try {
    const { token } = req.headers;
    if (!token) {
      throw new Error("ERROR: LOGIN_REQUESTED");
    }
    const result = await productservice.LineUpToNew(token);
    res.status(200).json({ products: result });
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ message: err.message });
  }
};
module.exports = {
  getProducts,
  getProductsByCategory,
  product,
  LineUpToNew,
};
