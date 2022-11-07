const likeService = require("../services/likeService");

const addLike = async (req, res) => {
  try {
    const { product_id } = req.body;
    const { token } = req.headers;

    const REQUIRED_KEYS = {
      product_id,
    };

    Object.keys(REQUIRED_KEYS).map((key) => {
      if (!REQUIRED_KEYS[key]) {
        const error = new Error(`KEY_ERROR: ${key}`);
        error.statusCode = 400; //잘못된 값이 포함되거나 값이 없을때 400
        throw error;
      }
    });

    await likeService.addLike(product_id, token);
    res.status(201).json({ message: "success product like" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const likeInfo = async (req, res) => {
  try {
    const { token } = req.headers;

    let result = await likeService.likeInfo(token);
    res.status(200).json({ message: "success check likelist", data: result });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const removeLike = async (req, res) => {
  try {
    const { product_id } = req.body;
    const { token } = req.headers;

    const REQUIRED_KEYS = {
      product_id,
    };

    Object.keys(REQUIRED_KEYS).map((key) => {
      if (!REQUIRED_KEYS[key]) {
        const error = new Error(`KEY_ERROR: ${key}`);
        error.statusCode = 400; //잘못된 값이 포함되거나 값이 없을때 400
        throw error;
      }
    });

    await likeService.removeLike(product_id, token);

    res.status(200).json({ message: "success delete product" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { addLike, likeInfo, removeLike };
