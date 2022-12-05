const cartService = require("../services/cartService");
const { findEmptyData } = require("../middlewares/etc");

//메인페이지에서 상품사진에 있는 장바구니 모양 눌렀을때 실행될 api
const cartUpdate = async (req, res) => {
  try {
    const { product_id, put_quantity } = req.body;
    const user_id = req.userInfo.id;
    const REQUIRED_KEYS = {
      product_id,
      put_quantity,
    };

    await findEmptyData(REQUIRED_KEYS);

    await cartService.cartUpdate(product_id, put_quantity, user_id);
    res
      .status(200)
      .json({ message: "You have successfully added an item to your cart" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const cartList = async (req, res) => {
  try {
    const user_id = req.userInfo.id;
    const result = await cartService.cartList(user_id);
    res.status(200).json({ message: "success", data: result });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const deleteItemInCart = async (req, res) => {
  try {
    const { product_id } = req.body;
    const user_id = req.userInfo.id;
    const REQUIRED_KEYS = {
      product_id,
    };

    await findEmptyData(REQUIRED_KEYS);

    await cartService.deleteItemInCart(product_id, user_id);
    res.status(200).json({ message: "success delete product" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { cartUpdate, cartList, deleteItemInCart };
