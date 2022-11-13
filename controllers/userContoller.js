const userService = require("../services/userService");
const bcrypt = require("bcryptjs");

const { check } = require("prettier");

//이메일 중복확인
const doubleCheckEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const REQUIRED_KEYS = { email };

    Object.keys(REQUIRED_KEYS).map((key) => {
      if (!REQUIRED_KEYS[key]) {
        const error = new Error(`KEY_ERROR: ${key}`);
        error.statusCode = 400;
        throw error;
      }
    });

    const result = await userService.doubleCheckEmail(email);
    res.status(200).json({ message: "NEW_EMAIL" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const signup = async (req, res) => {
  try {
    const {
      email,
      password,
      username,
      phoneNumber,
      address,
      birthDate,
      gender_id,
    } = req.body;

    const REQUIRED_KEYS = {
      email,
      password,
      username,
      phoneNumber,
      address,
      birthDate,
      gender_id,
    };

    Object.keys(REQUIRED_KEYS).map((key) => {
      if (!REQUIRED_KEYS[key]) {
        const error = new Error(`KEY_ERROR: ${key}`);
        error.statusCode = 400;
        throw error;
      }
    });

    await userService.signup(
      email,
      password,
      username,
      phoneNumber,
      address,
      birthDate,
      gender_id
    );

    res.status(201).json({ message: "USER_CREATED" });
  } catch (err) {
    console.log(err);
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).json({ message: "USER_ALREADY_EXISTS" });
    }

    res.status(err.statusCode).json({ message: err.message });
  }
};

//login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const REQUIRED_KEYS = { email, password };

    Object.keys(REQUIRED_KEYS).map((key) => {
      if (!REQUIRED_KEYS[key]) {
        const error = new Error(`KEY_ERROR: ${key}`);
        error.statusCode = 400;
        throw error;
      }
    });

    const token = await userService.login(email, password);

    res.status(200).json({ message: "LOGIN_SUCCESS", token: token });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

//logout

module.exports = {
  signup,
  login,
  doubleCheckEmail,
};
