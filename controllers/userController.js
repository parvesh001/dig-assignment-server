const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const AppError = require("../utils/appError");

function signToken(userId) {
  const jsonWebTokenSecret = process.env.JSON_WEB_TOKEN_SECRET;
  const jsonWebTokenExpiresIn = process.env.JSON_WEB_TOKEN_EXPIRESIN;
  return jwt.sign({ userId }, jsonWebTokenSecret, {
    expiresIn: jsonWebTokenExpiresIn,
  });
}

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const newUser = await User.create({
      name,
      email,
      password,
      confirmPassword,
    });
    // Exclude the 'password' field from the response
    newUser.password = undefined;
    const token = signToken(newUser._id);
    res.status(201).json({ status: "success", token, user: newUser });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) return next(new AppError("Email filed is required", 400));
    if (!password) return next(new AppError("Password filed is required", 400));

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new AppError("Wrong email or password", 401));

    const isComparable = await user.isComparable(password, user.password);
    if (!isComparable)
      return next(new AppError("Wrong email or password", 401));

    const token = signToken(user._id);

    res.status(200).json({
      status: "success",
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};
