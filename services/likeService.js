const likeDao = require("../models/likeDao");

const addLike = async (product_id, user_id) => {
  await likeDao.addLike(user_id, product_id);
};

const likeInfo = async (user_id) => {
  return await likeDao.likeInfo(user_id);
};

const removelike = async (product_id, user_id) => {
  await likeDao.removelike(user_id, product_id);
};

module.exports = { addLike, likeInfo, removelike };
