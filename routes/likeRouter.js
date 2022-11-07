const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");

const likeController = require("../controllers/likeController");

router.post("/addlike", likeController.addLike);
router.get("/likeinfo", likeController.likeInfo);
router.delete("/removelike", likeController.removeLike);

module.exports = router;
