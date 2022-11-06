require("dotenv").config();

const { createApp } = require("./app");

// app.post("/join", async (req, res) => {
//   // 1. signup handling
//   const result = userController.signup();
// });

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(`Listening on Port http://localhost:${PORT}/`);
  });
};

startServer();
