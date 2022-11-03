const cartDao = require("../models/cartDao");

const cartUpdate = async (product_name) => {
  //장바구니 담는 기능은 회원가입 한사람만 할 수 있게 기능 구현
  //해당 토큰으로 user_id 가져올 수 있음
  const user_id = 1;
  await cartDao.cartUpdate(product_name, user_id);
};

const cartList = async (req, res) => {
  //에러처리
};

module.exports = { cartUpdate, cartList };
