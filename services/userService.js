// signup: 1. email, pw, pw2, name, phone, address, gender, birth
const userDao = require("../models/userDao");

const signup = async (
  email,
  password,
  name,
  phoneNumber,
  address,
  birthdate,
  gender_id
) => {
  //error - discuss controlling errors with fe
  //email validation
  //password validation

  const user = userDao.findUserByEmail(email);

  if (user.length !== 0) {
    throw new Error("USER_ALREADY_EXISTS");
  }

  const hashedPw = bcrypt.hashsync(password, bcrypt.genSaltSync());
};
