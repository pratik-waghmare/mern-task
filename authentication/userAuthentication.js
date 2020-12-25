const HttpError = require("../models/http-error");
const User = require("../models/user");

const userAuthenticationById = async (req, res, next) => {
  const userId = req.params.uid;

  let identifiedUser;
  try {
    identifiedUser = await User.findById(userId);
  } catch (err) {
    next(new HttpError("Database error", 500));
  }

  if (!identifiedUser) {
    next(new HttpError("User don't exist.", 404));
  }

  next();
};

const userAuthenticationSignUp = async (req, res, next) => {
  const { email } = req.body;

  let identifiedUser;
  try {
    identifiedUser = await User.findOne({ email: email });
  } catch (err) {
    next(new HttpError("Database error", 500));
  }

  if (identifiedUser) {
    next(new HttpError("Email exists.", 403));
  }

  next();
};

const userAuthenticationLogin = async (req, res, next) => {
  const { email } = req.body;

  let identifiedUser;
  try {
    identifiedUser = await User.findOne({ email: email });
  } catch (err) {
    next(new HttpError("Database error", 500));
  }

  if (!identifiedUser) {
    next(new HttpError("User don't exist.", 404));
  }

  next();
};

module.exports.userAuthenticationSignUp = userAuthenticationSignUp;
module.exports.userAuthenticationById = userAuthenticationById;
module.exports.userAuthenticationLogin = userAuthenticationLogin;
