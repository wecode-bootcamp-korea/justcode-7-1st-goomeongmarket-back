// signup
const userService = require("../services/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check } = require("prettier");

const doubleCheckEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const REQUIRED_KEYS = { email };

    Object.keys(REQUIRED_KEYS).map((key) => {
      if (!REQUIRED_KEYS[key]) {
        const error = new Error(`KEY_ERROR: ${key}`);
        error.statusCode = 400;
        throw error;
      }
    });
  } catch (err) {
    console.log(err);
  }

  res.status(err.statusCode).json({ message: err.message });
};

// controller.signup 함수 정의
const signup = async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      phoneNumber,
      address,
      birthDate,
      gender_id,
      hashedPw,
    } = req.body;

    // 1. 키에러

    const REQUIRED_KEYS = {
      email,
      password,
      name,
      phoneNumber,
      address,
      birthDate,
      gender_id,
    };

    Object.keys(REQUIRED_KEYS).map((key) => {
      if (!REQUIRED_KEYS[key]) {
        const error = new Error(`KEY_ERROR: ${key}`);
        error.statusCode = 400;
        throw error;
      }
    });

    await userService.signup(
      //service에서 controller로 연결
      email,
      password,
      name,
      phoneNumber,
      address,
      birthDate,
      gender_id,
      hashedPw
    );

    res.status(201).json({ message: "USER_CREATED" });
  } catch (err) {
    console.log(err);
    if (err.code === "ER_DUP_ENTRY") {
      // db에서 이메일 unique 설정
      res.status(400).json({ message: "USER_ALREADY_EXISTS" });
    }

    res.status(err.statusCode).json({ message: err.message });
  }
};

// //비밀번호 확인 칸
// const pwcheck = async (req, res) => {
//   try {
//     const { password, password2 } = req.body;
//     const REQUIRED_KEYS = {
//       password,
//       password2,
//     };

//     Object.keys(REQUIRED_KEYS).map((key) => {
//       if (!REQUIRED_KEYS[key]) {
//         const error = new Error(`KEY_ERROR: ${key}`);
//         error.statusCode = 400;
//         throw error;
//       }
//     });
//     await userService.pwcheck(password, password2);

//     res.status(201).json({ message: "SAME_PASSWORD" });
//   } catch (err) {
//     console.log(err);
//     res.status(err.statusCode).json({ message: err.message });
//   }
// };

//login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const REQUIRED_KEYS = { email, password };

    Object.keys(REQUIRED_KEYS).map((key) => {
      if (!REQUIRED_KEYS[key]) {
        const error = new Error(`KEY_ERROR: ${key}`);
        err.statusCode = 400;
        throw error;
      }
    });

    await userService.login(email, password);

    //비밀번호 동일한지 확인
    const isSame = bcrypt.compareSync(password, existingUser.password);
    await userService.login(isSame);
    console.log("isSamePassword: ", isSame);

    // success
    const token = jwt.sign({ id: existingUser.id }, process.env.SECRET_KEY);
    //jwt.sign(발급)
    res.status(200).json({ message: "LOGIN_SUCCESS", token: token });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

//update - 처음 한번더 이메일/비밀번호 입력시 로그인 API 이용

// const update = async (req, res) => {
//   try {
//     //고객으로부터 받을 정보

//     //키에러를 체크해야 하나? 모든 키가 필수값은 아닌데.
//     //최소 하나는 수정을 하게끔 만들어야 하나?

//   } catch (err) {
//     console.log(err);
//     res.status(err.statusCode).json({ message: err.message });
//   }
// };

//delete

module.exports = {
  signup,
  //pwcheck,
  login,
  doubleCheckEmail,
  // update,
  // delete
}; // userController.login -->router에서 쓰기 위함
