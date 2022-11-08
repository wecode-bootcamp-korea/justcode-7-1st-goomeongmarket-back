// signup
const userService = require("../services/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check } = require("prettier");

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
  } catch (err) {
    console.log(err);
  }

  res.status(err.statusCode).json({ message: err.message });
};

const signup = async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      phoneNumber,
      address,
      birthDate,
      gender_id,
      hashedPw,
    } = req.body;

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
        error.statusCode = 400;
        throw error;
      }
    });

    await userService.signup(
      email,
      password,
      name,
      phoneNumber,
      address,
      birthDate,
      gender_id,
      hashedPw
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
        err.statusCode = 400;
        throw error;
      }
    });

    const token = await userService.login(email, password);
    console.log(token);
    res.status(200).json({ message: "LOGIN_SUCCESS", token: token });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = {
  signup,
  login,
  doubleCheckEmail,
};
