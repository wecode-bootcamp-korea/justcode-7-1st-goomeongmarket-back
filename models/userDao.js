// const bcrypt = require("bcryptjs");
const myDataSource = require("./index");

//이메일 중복확인
const doubleCheckEmail = async (email) => {
  const user = await myDataSource.query(`
    SELECT id, email FROM users WHERE email = '${email}'
    `);
  console.log(user);
  return user;
};

//signup
const createUser = async (
  email,
  hashedPw,
  username,
  phoneNumber,
  address,
  birthDate,
  gender_id
) => {
  await myDataSource.query(`
INSERT INTO users (email, password, username, phoneNumber, address, birthDate, gender_id) VALUES (
  '${email}', '${hashedPw}', '${username}', '${phoneNumber}', '${address}', ${birthDate}, ${gender_id}
)`);
};

//login

const login = async (email) => {
  // user 존재 체크
  const [existingUser] = await myDataSource.query(`
SELECT id, password FROM users WHERE email = '${email}'`);
  return existingUser;
};

const getMe = async (user_id) => {
  return await myDataSource.query(
    `
    SELECT 
      username
    FROM 
      users
    WHERE
      id = '${user_id}'
    `
  );
};

module.exports = {
  doubleCheckEmail,
  createUser,
  login,
  getMe,
};
