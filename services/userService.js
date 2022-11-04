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
  // 0. email, password 형식 에러 처리
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

module.exports = {
  signup,
};
