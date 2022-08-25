const user = require("../model/user");
const CryptoJS = require("crypto-js");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

//Register
const register = async (req, res) => {
  console.log("kkkkkkkkkkkkkkkkkk");
  console.log(req.body);
  const { username, email, password } = req.body;
  const newUser = new user({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      "CRYPTOSECRET"
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json({ created: true });
    console.log(savedUser);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

//Login
const login = async (req, res) => {
  try {
    console.log("loginnnnnnnnnnnn");
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json({ message: "wrong email" });
    const hashedPassword = CryptoJS.AES.decrypt(user.password, "CRYPTOSECRET");
    const passsword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const { password, ...others } = user._doc;
    passsword != req.body.password &&
      res.status(401).json({ message: "wrong password" });
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
    res.status(201).json({ ...others, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { register, login };
