const likeDao = require("../models/likeDao");

const addLike = async (product_id) => {
  //토큰에 있는 user정보를 가져와서 Like table에 저장해야함
  //로그인 만들어지면 작성
  const user_id = 1;
  await likeDao.addLike(user_id, product_id);
};

const likeInfo = async () => {
  //토큰에 있는 user정보를 가져와서 Like table에 저장해야함
  //로그인 만들어지면 작성
  const user_id = 1;
  return await likeDao.likeInfo(user_id);
};

const removelike = async (product_id) => {
  const user_id = 1;
  await likeDao.removelike(user_id, product_id);
};

module.exports = { addLike, likeInfo, removelike };
