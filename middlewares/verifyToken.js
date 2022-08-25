const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log("tokennnnnn");
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(403).json("Token is not valid");
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("not authenticated");
  }
};

const veriftTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      console.log("allowed");
      next();
    } else {
      res.status(403).json("you are not allowed");
    }
  });
};

const veriftTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      console.log("allowed");
      next();
    } else {
      res.status(403).json("you are not allowed");
    }
  });
};

module.exports = {
  verifyToken,
  veriftTokenAndAuthorization,
  veriftTokenAndAdmin,
};
