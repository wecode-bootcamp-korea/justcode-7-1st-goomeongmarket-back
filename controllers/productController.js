const productservice = require("../services/productService");

//------------------------------------------------------------------------------------

//메인에 전부 보내기
const getProducts = async (req, res) => {
  // const
  try {
    const result = await productservice.getProducts();
    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ message: err.message });
  }
};

//카테고리 별로 보내기---------------------------------------------------------------------
const getProductsByCategory = async (req, res) => {
  const category_id = req.params.categoryId;
  const sorted_by = req.query.sorted_by;
  try {
    const result = await productservice.getProductsByCategory(
      category_id,
      sorted_by
    );
    res.status(200).json({ data: result });
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
    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ message: err.message });
  }
};
//결재----------------------------------------------------------------------
const orderProduct = async (req, res) => {
  try {
    const { product_id, ordered_number } = req.body;
    const { token } = req.headers;

    const required_keys = { product_id, ordered_number };

    Object.keys(required_keys).map((key) => {
      if (!required_keys[key]) {
        throw new Error(`KEY_ERROR: ${key}`);
      }
    });

    if (!token) {
      throw new Error("ERROR: LOGIN_REQUESTED");
    }

    const result = await productservice.orderProduct(
      token,
      product_id,
      ordered_number
    );
    res.status(200).json({ data: result });
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
    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ message: err.message });
  }
};

// 신상품 순으로 제품 보내기-------------------------------------------------------------------
const getNewProduct = async (req, res) => {
  const sorted_by = req.query.sorted_by;
  try {
    const result = await productservice.getNewProduct(category_id, sorted_by);
    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ message: err.message });
  }
};

const getBsetProduct = async (req, res) => {
  const sorted_by = req.query.sorted_by;
  try {
    const result = await productservice.getBsetProduct(category_id, sorted_by);
    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  getProductsByCategory,
  product,
  orderProduct,
  getReviewByProduct,
  getNewProduct,
  getBsetProduct,
};
/*
sorted_type = 2 -> 제품이름 순
sorted_type = 6 -> 가격 순
sorted_type = 2 -> 제품이름 순
sorted_type = 6 -> 가격 순
sorted_type = 10 -> 세일 순
sorted_type = 11 -> 신상 순
sorted_type = 15 -> 제품 많은 순*/
