require("dotenv").config();

const { createApp } = require("./app");
<<<<<<< HEAD
const router = require("./routes");
=======
>>>>>>> 6fdc3e1cf0cae5bc6f35adc40e7d4c3c4ac4e6f8

const startServer = async () => {
  const app = createApp();
  // const PORT = process.env.PORT;

<<<<<<< HEAD
  try {
    app.listen(PORT, () => {
      console.log(`Listening on Port http://localhost:${PORT}/`);
    });
  } catch (err) {
    console.log(err);
  }
=======
  app.listen(8000, () => {
    console.log(`Listening on Port http://localhost:8000/`);
  });
>>>>>>> 6fdc3e1cf0cae5bc6f35adc40e7d4c3c4ac4e6f8
};

startServer();
