const HttpError = require("../models/http-error");

const jwt = require("jsonwebtoken");

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
  // Get headers
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Split authHeader and get second element which is token
    const token = authHeader.split(" ")[1];

    // Verify token using secret key
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        // If token verification failed send error message
        next(new HttpError("Invalid token provided", 403));
      } else {
        // Add decoded information in req.decoded
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // If header is not present send error
    next(new HttpError("Auth token is not provided", 500));
  }
};

module.exports = {
  loginValidation,
  signupValidation,
  updateValidation,
  tokenValidation,
};
