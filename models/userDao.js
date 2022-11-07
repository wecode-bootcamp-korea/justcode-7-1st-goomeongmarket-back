// 1. signup
// 1-1. email 중복확인
const bcrypt = require("bcryptjs");
const myDataSource = require("../models/index");

//----------

//이메일 중복확인
const doubleCheckEmail = async (email) => {
  //async(외부에서 받아와야 하는 것)

  const user = await myDataSource.query(`
    SELECT id, email FROM users WHERE email = '${email}'
    `);
  return user;
};

const createUser = async (
  //dao는 보통 함수명을 crud로 보편적으로 함.
  email,
  hashedPw,
  name,
  phoneNumber,
  address,
  birthDate,
  gender_id
) => {
  await myDataSource.query(`
INSERT INTO users (email, password, name, phoneNumber, address, birthDate, gender_id) VALUES (
  '${email}', '${hashedPw}', '${name}', '${phoneNumber}', '${address}', ${birthDate}, ${gender_id}
)`);
};

//login

const login = async (email) => {
  // user 존재 체크
  const [existingUser] = await myDataSource.query(`
SELECT email, password FROM users WHERE email = '${email}`);
  console.log("USER: ", existingUser);
};

// update;

// const hashedPw = bcrypt.hashsync(password, bcrypt.genSaltSync());

// const update = async (
//   email,
//   hashedPw,
//   name,
//   phoneNumber,
//   address,
//   birthDate, //datetime -> date로 데이터 가공 어떻게..?
//   gender_id
// ) => {
//   await myDatasource.query(`
// UPDATE users SET (email, password, name, phoneNumber, address, birthDate, gender_id) VALUES (
//   '${email}', '${hashedPw}', '${name}', '${phoneNumber}', '${address}', '${birthDate}', '${gender_id}')
//   WHERE (id)= = '${id}'`);
// };

// //delete
module.exports = {
  doubleCheckEmail,
  createUser,
  login,
  //update,
}; //service에서 쓰기위함.
