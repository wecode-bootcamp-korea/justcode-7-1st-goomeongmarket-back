const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const myDataSource = require("../models/index");

const validateToken = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      const error = new Error("you need login");
      error.statusCode = 401; //unauthorized 인증 조건 충족x
      throw error;
    }

    //만약 토큰이 존재한다면
    const user = jwt.verify(token, jwtSecret);

    //해당 Userid를 가진 유저가 실제로 존재하는지. 확인

    const [userData] = await myDataSource.query(`
    SELECT id, email FROM users WHERE id = ${user.id}
    `);

    if (!userData) {
      const error = new Error("you need signup");
      error.statusCode = 404;
      throw error;
    }

    // validatatoken을 사용하는 api에게 userInfo 전달
    req.userInfo = userData;

    next();
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = validateToken;
