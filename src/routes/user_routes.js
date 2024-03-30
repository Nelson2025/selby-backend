const userRoutes = require("express").Router();
const UserController = require("../controllers/user_controller");

userRoutes.post("/userAccount", UserController.userAccount);
userRoutes.post("/signIn", UserController.signIn);
userRoutes.post("/createOtp", UserController.createOtp);
userRoutes.post("/verifyOtp", UserController.verifyOtp);
userRoutes.post("/getAllUsers", UserController.getAllUsers);
userRoutes.post("/:id", UserController.fetchUserById);

module.exports = userRoutes;
