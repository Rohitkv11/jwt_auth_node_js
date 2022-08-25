const express = require("express");
const { register, login } = require("../controllers/auth");
const {
  edit,
  deleteUser,
  findUser,
  userStats,
} = require("../controllers/userControllers");
const router = express.Router();
const {
  veriftTokenAndAuthorization,
  veriftTokenAndAdmin,
} = require("../middlewares/verifyToken");

router.post("/register", register);
router.post("/login", login);
router.put("/edit/:id", veriftTokenAndAuthorization, edit);
router.delete("/delete/:id", veriftTokenAndAdmin, deleteUser);
router.get("/find/:id", veriftTokenAndAdmin, findUser);
router.get("/userStats", veriftTokenAndAdmin, userStats);

module.exports = router;
