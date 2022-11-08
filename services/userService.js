const userDao = require("../models/userDao");
// const {
//   password_validation,
//   phoneNumber_validation,
//   birthDate_validation,
// } = require("../validationRule");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const doubleCheckEmail = async (email) => {
  await userDao.doubleCheckEmail(email);
  if (user.length !== 0) {
    const error = new Error("EMAIL_ALREADY_EXISTS");
    error.statusCode = 400;
    throw error;
  }
};
const signup = async (
  email,
  password,
  name,
  phoneNumber,
  address,
  birthDate,
  gender_id
) => {
  if (!email.includes("@") || !email.includes(".")) {
    const error = new Error("EMAIL_INVALID");
    error.statusCode = 400;
    throw error;
  }

  const hashedPw = bcrypt.hashSync(password, bcrypt.genSaltSync());

  const createUser = await userDao.createUser(
    email,
    hashedPw,
    name,
    phoneNumber,
    address,
    birthDate,
    gender_id
  );

  return createUser;
};

//login
const login = async (email, password) => {
  if (!email.includes("@") || !email.includes(".")) {
    const error = new Error("EMAIL_INVALID");
    error.statusCode = 400;
    throw error;
  }
  //password validation

  let existingUser = await userDao.login(email);
  // 2. user 존재안할 시 에러처리
  if (!existingUser) {
    const error = new Error("USER_DOES_NOT_EXIST");
    error.statusCode = 404;
    throw error;
  }

  // 3. user 존재하나 비번 틀릴시 에러처리
  const isSame = bcrypt.compareSync(password, existingUser.password);
  console.log(isSame);
  if (!isSame) {
    const error = new Error("INVALID_PASSWORD");
    error.statusCode = 400;
    throw error;
  }

  const token = jwt.sign({ id: existingUser.id }, jwtSecret);
  return token;
};

module.exports = {
  signup,
  login,
  doubleCheckEmail,
};
