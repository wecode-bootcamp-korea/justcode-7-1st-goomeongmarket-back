// 1. signup
// 1-1. email 중복확인
const myDataSource = require("../models/index");
const doubleCheckEmail = async (email) => {
  const user = await myDataSource.query(`
    SELECT id, email FROM users WHERE email = '${email}'
    `);
};

console.log("dao 1");

const signup = async (
  email,
  hashedPw,
  name,
  phoneNumber,
  address,
  birthDate, //datetime -> date로 데이터 가공 어떻게..?
  gender_id
) => {
  await myDatasource.query(`
INSERT INTO users (email, password, name, phoneNumber, address, birthDate, gender_id) VALUES (
  '${email}', '${hashedPw}', '${name}', '${phoneNumber}', '${address}', '${birthDate}', '${gender_id}'}
)`);
};

console.log("dao 2");

//login

const login = async (email, password) => {
  // user 존재 체크
  const [existingUser] = await myDataSource.query(`
SELECT email, password FROM users WHERE email = '${email}`);

  console.log("USER: ", existingUser);

  console.log("dao login 1");
};

//update

const update = async (
  email,
  hashedPw,
  name,
  phoneNumber,
  address,
  birthDate, //datetime -> date로 데이터 가공 어떻게..?
  gender_id
) => {
  await myDatasource.query(`
UPDATE users SET (email, password, name, phoneNumber, address, birthDate, gender_id) VALUES (
  '${email}', '${hashedPw}', '${name}', '${phoneNumber}', '${address}', '${birthDate}', '${gender_id}') 
  WHERE (id)= = '${id}'`);
};

//delete
module.exports = {
  doubleCheckEmail,
  signup,
  login,
  update,
};
