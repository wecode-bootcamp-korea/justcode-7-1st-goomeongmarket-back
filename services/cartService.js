const cartDao = require("../models/cartDao");

const cartUpdate = async (product_id, put_quantity, user_id) => {
  await cartDao.cartUpdate(product_id, put_quantity, user_id);
};

const cartList = async (user_id) => {
  return await cartDao.cartList(user_id);
};

module.exports = { cartUpdate, cartList };
