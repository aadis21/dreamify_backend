const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB !!", error);
  });
