const userDao = require("../models/userDao");
// const {
//   password_validation,
//   phoneNumber_validation,
//   birthDate_validation,
// } = require("../validationRule");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    throw new Error("EMAIL_INVALID");
  }

  // if (!email.match(email_validation)) {
  //   throw new Error("EMAIL_INVALID");
  // }
  // console.log(password_validation.test(password));

  // if (!password.match(password_validation)) {
  //   throw new Error("PASSWORD_INVALID");
  // }

  // if (!phoneNumber.match(phoneNumber_validation)) {
  //   throw new Error("PHONENUMBER_INVALID");
  // }

  // if (!birthDate.match(birthDate_validation)) {
  //   throw new Error("BIRTHDATE_INVALID");
  // }

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
    throw new Error("EMAIL_INVALID");
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

  if (!isSame) {
    const error = new Error("INVALID_PASSWORD");
    error.statusCode = 400;
    throw error;
  }

  const token = jwt.sign({ id: existingUser.id }, process.env.SECRET_KEY);
  return token;
};

module.exports = {
  signup,
  login,
  doubleCheckEmail,
};
