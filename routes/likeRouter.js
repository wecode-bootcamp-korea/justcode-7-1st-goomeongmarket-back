const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");

const likeController = require("../controllers/likeController");

router.post("/addlike", validateToken, likeController.addLike);
router.get("/likeinfo", validateToken, likeController.likeInfo);
router.delete("/removelike", validateToken, likeController.removelike);

module.exports = router;
