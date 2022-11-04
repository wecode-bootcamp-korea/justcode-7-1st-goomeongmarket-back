// 1. signup
// 1-1. email 중복확인
const myDataSource = require("../models/index");
const doubleCheckEmail = async (email) => {
  const user = await myDataSource.query(`
    SELECT id, email FROM users WHERE email = '${email}'
    `);

  return user;
};

//api 작성해야... 후.... 하나씩 구축할때마다 error나올 때 목데이터도 넣어서 예시를 보여줘야

console.log("dao 1");

const signup = async (
  email,
  hashedPw,
  name,
  phoneNumber,
  address,
  birthDate, //datetime -> date로 데이터 가공
  gender_id
) => {
  await myDatasource.query(`
INSERT INTO users (email, password, name, phoneNumber, address, birthDate, gender_id) VALUES (
  '${email}', '${hashedPw}', '${name}', '${phoneNumber}', '${address}', '${birthDate}', '${gender_id}'}
)`);
};

console.log("dao 2");
module.exports = {
  doubleCheckEmail,
  signup,
};
