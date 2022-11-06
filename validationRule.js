const email_validation = "/S+@S+.S+/";
const password_validation =
  "/^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-zd~!@#$%^&*()_+=]{10,}$/";
const phoneNumber_validation = "/^010?(([0-9]{8})$/";
const birthDate_validation =
  "/^(19[0-9][0-9]|20d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/";
module.exports = {
  email_validation,
  password_validation,
  phoneNumber_validation,
  birthDate_validation,
};
