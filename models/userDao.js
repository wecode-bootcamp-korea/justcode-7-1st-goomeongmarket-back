// 1. signup
// 1-1. email이 겹치면 회원가입 불가

const findUserByEmail = async () => {
  const user = await myDataSource.query(`
    SELECT id, email FROM users WHERE email = '${email}'
    `);

  return user;
};

module.exports = {
  findUserByEmail,
};
