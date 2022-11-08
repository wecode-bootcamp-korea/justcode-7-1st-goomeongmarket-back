const cartService = require("../services/cartService");

//메인페이지에서 상품사진에 있는 장바구니 모양 눌렀을때 실행될 api
const cartUpdate = async (req, res) => {
  try {
    const { product_id, put_quantity } = req.body;
    const { token } = req.headers;
    const REQUIRED_KEYS = {
      product_id,
      put_quantity,
    };

    Object.keys(REQUIRED_KEYS).map((key) => {
      if (!REQUIRED_KEYS[key]) {
        const error = new Error(`KEY_ERROR: ${key}`);
        error.statusCode = 400; //잘못된 값이 포함되거나 값이 없을때 400
        throw error;
      }
    });
    await cartService.cartUpdate(product_id, put_quantity);

    res
      .status(200)
      .json({ message: "You have successfully added an item to your cart" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

//페이지상의 장바구니 버튼을 눌렀을 때 해당 유저가 담은 제품 목록을 알려주는 api
const cartList = async (req, res) => {
  try {
    const { token } = req.headers;
    const result = await cartService.cartList();
    res.status(200).json({ message: "success", data: result });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { cartUpdate, cartList };
