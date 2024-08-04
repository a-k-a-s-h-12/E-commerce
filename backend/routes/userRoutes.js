const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const authenticateUser = require("../middlewares/authenticate.js");
const { authenticate, authorizeAdmin } = authenticateUser;

router
  .route("/")
  .post(userController.createUser)
  .get(authenticate, authorizeAdmin, userController.getAllUser); // Admin  can only get all users
router.post("/auth", userController.loginUser);
router.post("/logout", userController.logoutUser);
router
  .route("/profile")
  .get(authenticate, userController.getCurrentUserProfile)
  .put(authenticate, userController.updateCurrentProfile);

//Admin routes
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, userController.deleteUser)
  .get(authenticate, authorizeAdmin, userController.getUserById)
  .put(authenticate, authorizeAdmin, userController.updateUserById);
  
module.exports = router;
