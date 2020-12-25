const express = require("express");

const UserController = require("../controllers/user-controller");
const Validation = require("../authentication/validation");
const UserAuthentication = require("../authentication/userAuthentication");

const router = express.Router();

router.get("/users", UserController.getUsers);

router.get("/:uid", [Validation.tokenValidation, UserController.getUserById]);

router.post("/login", [
  Validation.loginValidation,
  UserAuthentication.userAuthenticationLogin,
  UserController.login,
]);

router.post("/signup", [
  Validation.signupValidation,
  UserAuthentication.userAuthenticationSignUp,
  UserController.signup,
]);

router.patch("/:uid", [
  Validation.updateValidation,
  UserAuthentication.userAuthenticationById,
  Validation.tokenValidation,
  UserController.updatePassword,
]);

module.exports = router;
