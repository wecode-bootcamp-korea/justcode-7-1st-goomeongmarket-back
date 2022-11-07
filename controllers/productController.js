const productservice = require("../services/productService");

//------------------------------------------------------------------------------------

//메인에 전부 보내기
const getProducts = async (req, res) => {
  try {
    const result = await productservice.getProducts;
    res.status(200).json({ products: result });
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ message: err.message });
  }
};
//카테고리 별로 보내기---------------------------------------------------------------------
const getProductsByCategory = async (req, res) => {
  const category_id = req.params.categoryId;
  const sorted_type = req.query.sorted_type;
  const filters = req.query.filters;
  try {
    const result = await productservice.getProductsByCategory(
      category_id,
      sorted_type,
      filters
    );
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ message: err.message });
  }
};
//제품별로 보내기-----------------------------------------------------------------------
const product = async (req, res) => {
  const product_id = req.params.productId;
  try {
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
    const result = await productservice.LineUpToNew;
    res.status(200).json({ products: result });
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ message: err.message });
  }
};
//제품 밑 리뷰 보기-------------------------------------------------------------------------
const getReviewByProduct = async (req, res) => {
  const product_id = req.params.productId;
  try {
    const result = await productservice.getReviewByProduct(product_id);
    res.status(200).json({ result });
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
  getReviewByProduct,
};
