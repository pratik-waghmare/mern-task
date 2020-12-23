const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const HttpError = require("../models/http-error");

const getUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find({}, "-password");
  } catch (err) {
    console.log(err);
    next(new HttpError("Database error", 500));
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const getUserById = async (req, res, next) => {
  const userId = req.params.uid;
  const authHeader = req.headers.authorization;

  // Get user from database
  let identifiedUser;
  try {
    identifiedUser = await User.findById(userId, "-password");
  } catch (err) {
    console.log(err);
    next(new HttpError("Database error", 500));
  }

  // Verify if JWT token is correct
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, userToken) => {
    if (err) {
      // If token is invalid
      console.log(err);
      next(new HttpError("Database error", 500));
    }

    // If token is valid return token and user information
    res.status(200).json({ userToken, user: identifiedUser });
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Get user from database
  let identifiedUser;
  try {
    identifiedUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
    next(new HttpError("Database error", 500));
  }

  //   Compare hashed password with user password
  let isPasswordValid;
  try {
    isPasswordValid = await bcrypt.compare(password, identifiedUser.password);
  } catch (err) {
    console.log(err);
    next(new HttpError("Password comparison failed", 500));
  }

  if (!isPasswordValid) {
    next(new HttpError("Wrong Password", 500));
  }

  // Generate JWT token
  let token;
  try {
    token = await jwt.sign(
      {
        email: identifiedUser.email,
        userId: identifiedUser.id,
      },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: "1hr",
      }
    );
  } catch (err) {
    console.log(err);
    next(new HttpError("Token generation failed", 500));
  }

  res.status(200).json({
    message: "Logged in successfully",
    user: {
      userId: identifiedUser.id,
      email: identifiedUser.email,
      token: token,
    },
  });
};

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Get user from database
  let identifiedUser;
  try {
    identifiedUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
    next(new HttpError("Database error", 500));
  }

  // Encrypt password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    console.log(err);
    next(new HttpError("Encryption failed", 500));
  }

  // Save user to database with hashed password
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
  } catch (err) {
    console.log(err);
    next(new HttpError("Database error", 500));
  }

  res.json({ message: "User registeration successful" });
};

const updatePassword = async (req, res, next) => {
  const userId = req.params.uid;
  const authHeader = req.headers.authorization;
  const { password, newPassword } = req.body;

  // Get user from database
  let identifiedUser;
  try {
    identifiedUser = await User.findById(userId);
  } catch (err) {
    console.log(err);
    next(new HttpError("Database error", 500));
  }

  // Verify if JWT token is correct
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
    if (err) {
      // If token is invalid
      console.log(err);
      next(new HttpError("Invalid Token", 500));
    }
  });

  // Check if passwords match
  let isPasswordValid;
  try {
    isPasswordValid = await bcrypt.compare(password, identifiedUser.password);
  } catch (err) {
    console.log(err);
    next(new HttpError("Password comparison failed", 500));
  }

  if (!isPasswordValid) {
    next(new HttpError("Wrong password", 500));
  }

  // Hash new password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(newPassword, 12);
  } catch (err) {
    console.log(err);
    next(new HttpError("Encryption failed", 500));
  }

  // Save hashed password in user schema
  identifiedUser.password = hashedPassword;

  try {
    await identifiedUser.save();
  } catch (err) {
    console.log(err);
    next(new HttpError("Database error", 500));
  }

  res.status(200).json({ message: "Password Changed" });
};

module.exports.getUsers = getUsers;
module.exports.getUserById = getUserById;
module.exports.login = login;
module.exports.signup = signup;
module.exports.updatePassword = updatePassword;
