const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");


//Verify the jwt.verify() set req.user with current user
exports.authenticate = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SCERET);
      // console.log(decoded);
      // {
      //    userID: '6683a1be3113ea99a3ad7c07',
      //    iat: 1719902926,
      //    exp: 1722494926
      //  }
      const extractUserId = decoded.userID;
      req.user = await User.findById(extractUserId).select("-password");
      // console.log(req.user);
      // {
      //    _id: new ObjectId('6683a1be3113ea99a3ad7c07'),
      //     userName: 'Geetha Priya D',
      //     email: 'gethapriya1976@gmail.com',
      //     isAdmin: true,
      //     createdAt: 2024-07-02T06:44:14.175Z,
      //     updatedAt: 2024-07-02T06:44:14.175Z,
      // __v: 0
      // }
      next();
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  } else {
    res.status(401).json({
      message: "not authenticated,Token not found",
    });
  }
};


exports.authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as Admin" });
  }
};
