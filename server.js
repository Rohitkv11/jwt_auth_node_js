const db = require("./config/db");
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRouter");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

db();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/user", userRoutes);

const port = 5000;

app.listen(port, () => {
  console.log(`port running on ${port}`);
});
