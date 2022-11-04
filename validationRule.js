const email_validation = "/S+@S+.S+/";
const password_validation =
  "/^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-zd~!@#$%^&*()_+=]{10,}$/";

module.exports = { email_validation, password_validation };
