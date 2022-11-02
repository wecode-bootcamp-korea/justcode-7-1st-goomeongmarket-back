// signup
const userService = require("../services/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      phoneNumber,
      address,
      birthdate,
      gender_id,
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
        throw new Error("KEY_ERROR: ${key}");
      }
    });

    const result = userService.signup(
      email,
      password,
      name,
      phoneNumber,
      address,
      birthdate,
      gender_id
    );

    res.status(201).json({ message: "USER_CREATED" });
  } catch (err) {
    console.log(err);
    if (err.code === "") {
      res.status(400).json({ message: "USER_ALREADY_EXISTS" });
    }
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  signup,
};

//login

//update

//delete
