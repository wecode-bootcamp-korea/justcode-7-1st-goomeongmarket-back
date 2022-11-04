const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;

const reviewDao = require("../models/reviewDao");
//-----------------------------------------------------------------------------------------
const myReviewList = async (token) => {
  const user = jwt.verify(token, secret_key);
  const user_id = user.id;
  // const user_id = 2;
  const result = await reviewDao.myReviewList(user_id);
  if (!result.length) {
    const error = new Error("WRITTEN_COMMENT_DOES_NOT_EXIST");
    error.status = 400;
    throw error;
  } else {
    return result;
  }
};

module.exports = {
  myReviewList,
};
