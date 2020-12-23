const express = require("express");

const UserController = require("../controllers/user-controller");
const UserValidation = require("../authentication/inputValidation");
const UserAuthentication = require("../authentication/userAuthentication");

const router = express.Router();

router.get("/users", UserController.getUsers);

router.get("/:uid", [
  UserValidation.tokenValidation,
  UserAuthentication.userAuthenticationById,
  UserController.getUserById,
]);

router.post("/login", [
  UserValidation.loginValidation,
  UserAuthentication.userAuthenticationLogin,
  UserController.login,
]);

router.post("/signup", [
  UserValidation.signupValidation,
  UserAuthentication.userAuthenticationSignUp,
  UserController.signup,
]);

router.patch("/:uid", [
  UserValidation.updateValidation,
  UserValidation.tokenValidation,
  UserAuthentication.userAuthenticationById,
  UserController.updatePassword,
]);

module.exports = router;
