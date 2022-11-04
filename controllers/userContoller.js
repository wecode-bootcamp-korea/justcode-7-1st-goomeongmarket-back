// signup
const userService = require("../services/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
      birthdate,
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
        throw new Error("KEY_ERROR: ${key}");
      }
    });

    console.log("controller 2");

    const result = await userService.signup(
      email,
      password,
      name,
      phoneNumber,
      address,
      birthdate,
      gender_id
    );

    console.log("controller 3");

    res.status(201).json({ message: "USER_CREATED" });
  } catch (err) {
    console.log(err);
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).json({ message: "USER_ALREADY_EXISTS" });
    }
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  signup,
};

//login

// const login = async (req, res) => {
//   try {
//     console.log("controller 1");
//     const { email, password } = req.body

//     //1. key error check

//     const REQUIRED_KEYS = { email, password }

//     Object.keys(REQUIRED_KEYS).map((key) => {
//       if (!REQUIRED_KEYS[key]) {
//         throw new Error("KEY_ERROR: ${key}");
//       }
//     })
// }}
