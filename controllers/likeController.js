const likeService = require("../services/likeService");
const { findEmptyData } = require("../middlewares/etc");

const addLike = async (req, res) => {
  try {
    const { product_id } = req.body;
    const user_id = req.userInfo.id;

    const REQUIRED_KEYS = {
      product_id,
    };

    await findEmptyData(REQUIRED_KEYS);

    await likeService.addLike(product_id, user_id);
    res.status(201).json({ message: "success product like" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const likeInfo = async (req, res) => {
  try {
    const user_id = req.userInfo.id;

    let result = await likeService.likeInfo(user_id);
    res.status(200).json({ message: "success check likelist", data: result });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const removelike = async (req, res) => {
  try {
    const { product_id } = req.body;
    const user_id = req.userInfo.id;

    const REQUIRED_KEYS = {
      product_id,
    };

    await findEmptyData(REQUIRED_KEYS);

    await likeService.removelike(product_id, user_id);

    res.status(200).json({ message: "success delete product" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { addLike, likeInfo, removelike };
