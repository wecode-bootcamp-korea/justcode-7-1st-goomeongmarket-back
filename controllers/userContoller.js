// signup
const userService = require("../services/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateToken = require("../middlewares/validateToken");
const { check } = require("prettier");

const signup = async (req, res) => {
  try {
    console.log("controller 1");
    const {
      email,
      password,
      name,
      phoneNumber,
      address,
      birthDate,
      gender_id,
    } = req.body;

    // 1. 키에러

    const REQUIRED_KEYS = {
      email,
      password,
      name,
      phoneNumber,
      address,
      birthDate,
      gender_id,
    };

    Object.keys(REQUIRED_KEYS).map((key) => {
      if (!REQUIRED_KEYS[key]) {
        const error = new Error(`KEY_ERROR: ${key}`);
        err.statusCode = 400;
        throw error;
      }
    });

    console.log("controller 2");

    await userService.signup(
      email,
      password,
      name,
      phoneNumber,
      address,
      birthDate,
      gender_id
    );

    console.log("controller 3");

    res.status(201).json({ message: "USER_CREATED" });
  } catch (err) {
    console.log(err);
    if (err.code === "ER_DUP_ENTRY") {
      // db에서 이메일 unique 설정
      res.status(400).json({ message: "USER_ALREADY_EXISTS" });
    }
    res.status(err.statusCode).json({ message: err.message });
  }
};

//login

const login = async (req, res) => {
  try {
    console.log("controller login 1");
    const { email, password } = req.body;

    //1. key error check

    const REQUIRED_KEYS = { email, password };

    Object.keys(REQUIRED_KEYS).map((key) => {
      if (!REQUIRED_KEYS[key]) {
        const error = new Error(`KEY_ERROR: ${key}`);
        err.statusCode = 400;
        throw error;
      }
    });
    console.log("controller login 2");

    //비밀번호 동일한지 확인
    const isSame = bcrypt.compareSync(password, existingUser.password);

    console.log("isSamePassword: ", isSame);
    console.log("controller login 3");

    // success
    const token = jwt.sign({ id: existingUser.id }, process.env.SECRET_KEY);
    res.status(200).json({ message: "LOGIN_SUCCESS", token: token });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

//update - 처음 한번더 이메일/비밀번호 입력시 로그인 API 이용

const update = async (req, res) => {
  try {
    //고객으로부터 받을 정보
    const { token } = req.headers;
    const {
      email,
      password,
      name,
      phoneNumber,
      address,
      birthDate,
      gender_id,
    } = req.body;
    //키에러를 체크해야 하나? 모든 키가 필수값은 아닌데.
    //최소 하나는 수정을 하게끔 만들어야 하나?

    //get token from header
    if (!token) {
      const error = new Error("LOGIN_REQUIRED");
      error.statusCode = 401; //unauthorized
      throw error;
    }

    // if token -> jwt.verify
    const user = jwt.verify(token, process.env.SECRET_KEY);
    console.log(user);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

//delete
module.exports = {
  login,
  signup,
  update,
};
