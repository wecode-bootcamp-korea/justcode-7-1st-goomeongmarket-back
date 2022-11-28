// TODO 13 productService
const productservice = require("../services/productService");

//------------------------------------------------------------------------------------

//메인에 전부 보내기
const getProducts = async (req, res) => {
  // const
  try {
    const category_id = req.query.category_id;
    const sorted_by = req.query.sorted_by;
    // 만약 전부 보내기 -> category_id, sorted_by -- undefined
    const result = await productservice.getProducts(category_id, sorted_by);
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
const productData = async (req, res) => {
  // TODO 14 
  const { productId } = req.params
  // const product_id = req.params.productId;
  try {
    const result = await productservice.productData(productId);
    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ message: err.message });
  }
};
//결재----------------------------------------------------------------------
const orderProduct = async (req, res) => {
  // validate Token middleware 활용 -> not in controller, in router
  try {
    const { product_id, ordered_number } = req.body;
    // const { token } = req.headers;
    console.log(product_id);
    console.log(ordered_number);
    const required_keys = { product_id, ordered_number };

    Object.keys(required_keys).map((key) => {
      if (!required_keys[key]) {
        throw new Error(`KEY_ERROR: ${key}`);
      }
    });

    // if (!token) {
    //   throw new Error("ERROR: LOGIN_REQUESTED");
    // }

    // TODO 15

    await productservice.orderProduct(user_id, product_id, ordered_number);
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ message: err.message });
  }
};

//알뜰제품 순으로 보내기
const LineUpToCheap = async (req, res) => {
  try {
    const category_id = req.query.category_id;
    const sorted_by = req.query.sorted_by;
    const result = await productservice.LineUpToCheap(category_id, sorted_by);
    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ message: err.message });
  }
};

//제품 밑 리뷰 보기-------------------------------------------------------------------------
const getReviewByProduct = async (req, res) => {
  const { productId } = req.params
  try {
    const result = await productservice.getReviewByProduct(productId);
    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ message: err.message });
  }
};

// 신상품 순으로 제품 보내기-------------------------------------------------------------------
const getNewProduct = async (req, res) => {
  const category_id = req.query.category_id;
  const sorted_by = req.query.sorted_by;
  try {
    const result = await productservice.getNewProduct(category_id, sorted_by);
    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ message: err.message });
  }
};

const getBestProduct = async (req, res) => {
  const { category_id, sorted_by } = req.query
  try {
    const result = await productservice.getBestProduct(category_id, sorted_by);
    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  getProductsByCategory,
  productData,
  LineUpToCheap,
  getReviewByProduct,
  orderProduct,
  getNewProduct,
  getBestProduct,
};

const SORT_TYPE = {
  2: '제품순름 순',
  6: '가격 순',
  10: '세일 순'
}

// sort_by -> 10

// console.log(SORT_TYPE[sort_by]) // 세일 순

/*
sorted_type = 2 -> 제품이름 순
sorted_type = 6 -> 가격 순
sorted_type = 2 -> 제품이름 순
sorted_type = 6 -> 가격 순
sorted_type = 10 -> 세일 순
sorted_type = 11 -> 신상 순
sorted_type = 15 -> 제품 많은 순*/
