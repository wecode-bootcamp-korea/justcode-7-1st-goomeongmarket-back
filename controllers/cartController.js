const cartService = require("../services/cartService");

const cartList = async (req, res) => {
  console.log("hi");
  res.json({ message: "hi" });
  try {
    const { product_name } = req.body;

    const REQUIRED_KEYS = {
      product_name,
    };

    Object.keys(REQUIRED_KEYS).map((key) => {
      if (!REQUIRED_KEYS[key]) {
        const error = new Error(`KEY_ERROR: ${key}`);
        error.statusCode = 400; //잘못된 값이 포함되거나 값이 없을때 400
        throw error;
      }
    });
    const result = await cartService.cartList(product_name);
    res.status(200).json({ message: success, data: result });
  } catch (err) {
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { cartList };
