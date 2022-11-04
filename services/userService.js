const userDao = require("../models/userDao");
const { email_validation, password_validation } = require("../validationRule");
const signup = async (
  email,
  password,
  name,
  phoneNumber,
  address,
  birthdate,
  gender_id
) => {
  // 0. email, password 형식 에러 처리

  // if (!email.includes('@') || !email.includes('.')) {
  //   throw new Error ('EMAIL_INVALID')
  // }

  if (email_validation.test(email)) {
    throw new Error("EMAIL_INVALID");
  }

  if (password_validation.test(password)) {
    throw new Error("PASSWORD_INVALID");
  }
  // 1. email 중복확인

  console.log("service 1");

  const user = userDao.doubleCheckEmail(email);

  if (user.length !== 0) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  // 2. 비밀번호 확인 (입력한 비밀번호와 동일한지)

  // 3. 휴대폰 번호 형식 에러처리

  // 4. 주소 형식 에러처리

  // 5. 생년월일 형식 에러처리

  // 6. 필수를 모두 기입 또는 체크했는가

  const hashedPw = bcrypt.hashsync(password, bcrypt.genSaltSync());
};

//login
const login = async (email, password) => {
  // 1. 이메일, 비번 형식
  if (email_validation.test(email)) {
    throw new Error("EMAIL_INVALID");
  }

  if (password_validation.test(password)) {
    throw new Error("PASSWORD_INVALID");
  }

  console.log("service login 1");

  // 2. user 존재안할 시 에러처리
  if (!existingUser) {
    const error = new Error("USER_DOES_NOT_EXIST");
    error.statusCode = 404;
    throw error;
  }

  console.log("service login 2");

  // 3. 비번 틀릴시 에러처리
  if (!isSame) {
    const error = new Error("INVALID_PASSWORD");
    error.statusCode = 400;
    throw error;
  }

  console.log("service login 3");
};

//update

//delete

module.exports = {
  signup,
  login,
};
