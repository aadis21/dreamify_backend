const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://dreamifys.com",
      "http://localhost:5173",
      "https://www.//dreamifys.com",
    ],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.urlencoded({ extended: true }));

// Routes
const adminRoute = require("./src/routes/admin.route");
const candidateRoute = require("./src/routes/candidate.route");
const courseRoute = require("./src/routes/course.routes");

app.use("/api/admin", adminRoute);
app.use("/api/candidate", candidateRoute);
app.use("/api/course", courseRoute);

module.exports = app;
