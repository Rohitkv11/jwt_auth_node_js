const verifyToken = require("../middlewares/verifyToken");

const User = require("../model/user");

//EDIT USER
const edit = async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  try {
    const update = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(update);
  } catch (error) {
    if (error) {
      res.status(500).json(error);
    }
  }
};

//DELETE USER
const deleteUser = async (req, res) => {
  console.log(req.params.id);
  try {
    const deleteUser = await User.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(deleteUser);
  } catch (error) {
    res.status(500).json("user not deleted");
  }
};

//FIND USER
const findUser = async (req, res) => {
  console.log(req.params.id);
  try {
    const findUser = await User.findById({ _id: req.params.id });
    const { password, ...others } = findUser._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(404).json("user not found");
  }
};

//USER STATS
const userStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  console.log(lastYear);
  try {
    console.log("tryyyyyyyy");
    const userStats = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: lastYear },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    console.log(userStats);
    res.status(200).json(userStats);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { edit, deleteUser, findUser, userStats };
