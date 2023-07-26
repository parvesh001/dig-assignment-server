const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

function signToken(userId) {
  const jsonWebTokenSecret = process.env.JSON_WEB_TOKEN_SECRET;
  const jsonWebTokenExpiresIn = process.env.JSON_WEB_TOKEN_EXPIRESIN;
  return jwt.sign({ userId }, jsonWebTokenSecret, {
    expiresIn: jsonWebTokenExpiresIn,
  });
}

exports.signup = async (req, res, next) => {
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
};
