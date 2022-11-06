const userDao = require("../models/userDao"); //dao exports 불러오는걸 받아주는 역할
const { email_validation, password_validation } = require("../validationRule");
const signup = async (
  //service에서 이거 쓸거야 . usercontroller await userService에서 인자를 동일한 순서로 보내줘야함.
  email,
  password,
  name,
  phoneNumber,
  address,
  birthDate,
  gender_id
) => {
  console.log("service 1");

  // 0. email, password 형식 에러 처리

  // if (!email.includes('@') || !email.includes('.')) {
  //   throw new Error ('EMAIL_INVALID')
  // }  validation 안쓰고 직접 지정할 때

  if (!email.match(email_validation)) {
    throw new Error("EMAIL_INVALID");
  }

  if (!password.match(password_validation)) {
    throw new Error("PASSWORD_INVALID");
  }

  if (!phoneNumber.match(phoneNumber_validation)) {
    throw new Error("PHONENUMBER_INVALID");
  }

  if (!birthDate.match(birthDate_validation)) {
    throw new Error("PHONENUMBER_INVALID");
  }

  // 1. email 중복확인

  const user = await userDao.doubleCheckEmail(email); //파일 자체 사용시 require, 그 파일 내 함수 불러올거면 .으로

  if (user.length !== 0) {
    const error = new Error("EMAIL_ALREADY_EXISTS");
    error.statusCode = 400;
    throw error;
  }
  console.log("service 2");

  // 4. 주소 형식 에러처리

  // 6. 필수를 모두 기입 또는 체크했는가

  //hashedPw 생성
  const hashedPw = bcrypt.hashsync(password, bcrypt.genSaltSync());

  const createUser = await userDao.createUser(
    //다오에서 필요하니 보내주는 것
    email,
    hashedPw,
    name,
    phoneNumber,
    address,
    birthDate,
    gender_id
  );
  console.log("service 3");
  return createUser;
};

//비밀번호 확인 칸
const pwcheck = async (password, password2) => {
  if (password2 !== password) {
    const error = new Error("NOT_A_SAME_PASSWORD");
    error.statusCode = 400;
    throw error;
  }
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
  pwcheck,
  login,
  //update,
  //delete,
}; //controller에서 쓰기 위함.
