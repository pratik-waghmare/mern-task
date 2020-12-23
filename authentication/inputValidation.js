const HttpError = require("../models/http-error");

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new HttpError("Input fields cannot be empty", 500));
  }

  next();
};

const signupValidation = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    next(new HttpError("Input fields cannot be empty", 500));
  }

  next();
};

const updateValidation = (req, res, next) => {
  const { password, newPassword } = req.body;

  if (!password || !newPassword) {
    next(new HttpError("Input fields cannot be empty", 500));
  }

  next();
};

const tokenValidation = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    next(new HttpError("Token not found", 500));
  }

  next();
};

module.exports.loginValidation = loginValidation;
module.exports.signupValidation = signupValidation;
module.exports.updateValidation = updateValidation;
module.exports.tokenValidation = tokenValidation;
