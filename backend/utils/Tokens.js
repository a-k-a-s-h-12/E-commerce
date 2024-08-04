const jwt = require("jsonwebtoken");
const generateToken = (res, userID) => {
  const token = jwt.sign({ userID: userID }, process.env.JWT_SCERET, {
    expiresIn: "30d",
  });
  //set tokens in cookies for http only
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return token;
};

module.exports = generateToken;
