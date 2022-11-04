const reviewService = require("../services/reviewService");
//나가 쓴 리뷰--------------------------------------------------------------------------------
const myReviewList = async (req, res) => {
  try {
    const { token } = req.headers;
    if (!token) {
      const error = new Error(`REQUESTED_LOGIN`);
      error.statusCode = 400; //잘못된 값이 포함되거나 값이 없을때 400
      throw error;
    }
    const result = await reviewService.myReviewList(token);
    res.status(200).json({ message: success, data: result });
  } catch (err) {
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { myReviewList };
