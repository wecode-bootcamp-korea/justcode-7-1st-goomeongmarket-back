const bcrypt = require("bcryptjs");
const myDataSource = require("../models/index");

//이메일 중복확인
const doubleCheckEmail = async (email) => {
  const user = await myDataSource.query(`
    SELECT id, email FROM users WHERE email = '${email}'
    `);
  return user;
};

//signup
const createUser = async (
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
SELECT email, password FROM users WHERE email = '${email}'`);
  return existingUser;
};

module.exports = {
  doubleCheckEmail,
  createUser,
  login,
};
