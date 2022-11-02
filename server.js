require("dotenv").config();

const { createApp } = require("./app");

const userController = require("./controllers/userContoller");

const router = require("./routers");

app.use(router);
//로그아웃, 회원정보 불러오기

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;

  try {
    app.listen(8000, () => {
      console.log(`Listening on Port http://localhost:8000/`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
