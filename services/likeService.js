const likeDao = require("../models/likeDao");

const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const addLike = async (product_id, token) => {
  //토큰에 있는 user정보를 가져와서 Like table에 저장해야함
  //로그인 만들어지면 작성
  const user = jwt.verify(token, jwtSecret);
  const user_id = user.id;

  await likeDao.addLike(user_id, product_id);
};

const likeInfo = async (token) => {
  //토큰에 있는 user정보를 가져와서 Like table에 저장해야함
  //로그인 만들어지면 작성
  const user = jwt.verify(token, jwtSecret);
  const user_id = user.id;

  return await likeDao.likeInfo(user_id);
};

const removelike = async (product_id, token) => {
  const user = jwt.verify(token, jwtSecret);
  const user_id = user.id;

  await likeDao.removelike(user_id, product_id);
};

module.exports = { addLike, likeInfo, removelike };
