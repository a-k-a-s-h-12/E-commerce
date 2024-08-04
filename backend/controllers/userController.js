const User = require("../models/userModel.js");
const bcrypt = require("bcrypt"); //encrypt password
const generateToken = require("../utils/Tokens.js");

exports.createUser = async (req, res, next) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    throw new Error("Please Enter All Input Fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status("400").json({
      status: "Fail",
      message: "User Already Exsits",
    });
  }
  //password has be encrypted
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    //TOKEN is created when the USER is created
    generateToken(res, newUser._id);

    res.status(200).json({
      status: "Successfully Created User",
      User: newUser,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token and send response
    generateToken(res, existingUser._id);
    res.status(200).json({
      status: "Successfully Logged In",
      user: existingUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.logoutUser = (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "successfully Logged Out",
  });
};
exports.getAllUser = async (req, res, next) => {
  const users = await User.find({}).select("-password");
  res.status(200).json({
    message: "authenticated successfully and authorized as Admin",
    TotalUsers: users.length,
    users: users,
  });
};
exports.getCurrentUserProfile = async (req, res, next) => {
  const currentUserID = req.user._id;
  const user = await User.findById(currentUserID).select("-password");
  if (currentUserID) {
    res.status(200).json({
      message: "Current user Details",
      user: user,
    });
  } else {
    res.status(404).json({
      message: "User not Found",
    });
  }
};
exports.updateCurrentProfile = async (req, res, next) => {
  const CurrentUesrID = req.user._id;
  //if password is update it must encoded
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
  }

  if (CurrentUesrID) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        CurrentUesrID,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      ).select("-password");
      res.status(200).json({
        message: "Fields have been Updated",
        user: updatedUser,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  } else {
    res.status(404).json({
      message: "User Id not Found",
    });
  }
};
//admin routes by params id and access only by 'ADMIN'
exports.deleteUser = async (req, res, next) => {
  const deleteUserId = req.params.id;
  const deleteUser = await User.findById(deleteUserId);
  if (deleteUser) {
    if (deleteUser.isAdmin) {
      res.status(404).json({
        message: "Admin can't be Deleted",
      });
      return;
    }
    await User.deleteOne(deleteUser);
    res.status(200).json({
      message: "User Deleted Successfully",
    });
  } else {
    res.status(404).json({
      message: "User Not Found",
    });
  }
};
exports.getUserById = async (req, res, next) => {
  const userId = req.params.id;
  if (userId) {
    try {
      const user = await User.findById(userId).select("-password");
      res.status(200).json({
        message: "User infomations",
        user,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    res.status(404).json({
      message: "User Not Found",
    });
  }
};
exports.updateUserById = async (req, res, next) => {
  const updateUserId = req.params.id;
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
  }
  if (updateUserId) {
    try {
      const updateUser = await User.findByIdAndUpdate(updateUserId, req.body, {
        new: true,
        runValidators: true,
      }).select("-password");
      res.status(200).json({
        message: "Updated Successfully",
        user: updateUser,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  } else {
    res.status(404).json({
      message: "User Not Found",
    });
  }
};
