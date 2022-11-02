// 1. signup
// 1-1. email이 겹치면 회원가입 불가

const findUserByEmail = async (email) => {
  const user = await myDataSource.query(`
    SELECT id, email FROM users WHERE email = '${email}'
    `);

  return user;
};
const createUser = async (
  email,
  hashedPw,
  name,
  phoneNumber,
  address,
  birthDate,
  gender_id
) => {
  await myDatasource.query(`
INSERT INTO users (email, password, name, phoneNumber, address, birthDate, gender_id) VALUES (
  '${email}, '${hashedPw}, ${name}, ${phoneNumber}, ${address}, ${birthDate}, ${gender_id}}
)`);
};
module.exports = {
  findUserByEmail,
  createUser,
};
