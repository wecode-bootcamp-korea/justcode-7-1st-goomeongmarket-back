const cartDao = require("../models/cartDao");

const cartUpdate = async (product_id, put_quantity, user_id) => {
  let existProduct = await cartDao.cartUpdate(
    product_id,
    put_quantity,
    user_id
  );
  if (existProduct) {
    const error = new Error("already exist product");
    error.statusCode = 400;
    throw error;
  }
};

const cartList = async (user_id) => {
  return await cartDao.cartList(user_id);
};

const deleteItemInCart = async (product_id, user_id) => {
  await cartDao.deleteItemInCart(product_id, user_id);
};

const changeItemQuantity = async (product_id, put_quantity, user_id) => {
  await cartDao.changeItemQuantity(product_id, put_quantity, user_id);
};

module.exports = { cartUpdate, cartList, deleteItemInCart, changeItemQuantity };
