// signup
const userService = require("../services/userService");
const signup = async (req, res) => {
  const { email, password, name, phoneNumber, address, birthdate, gender_id } =
    req.body;

  const REQUIRED_KEYS = {
    email,
    password,
    name,
    phoneNumber,
    address,
    birthDate,
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
};

module.exports = {
  signup,
};

//login

//update

//delete
