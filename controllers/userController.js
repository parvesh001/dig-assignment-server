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
    if (!user.active)
      return next(new AppError("No user found with this email", 404));
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

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.get("Authorization").split(" ")[1];
  }
  try {
    if (!token)
      return next(new AppError("You are not authorized, please login", 401));

    const { userId } = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);

    //if verified, query user with id in payload and check if user is there
    const user = await User.findById(userId);
    if (!user) return next(new AppError("User no longer exist", 401));

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

exports.updateMe = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { runValidators: true, new: true }
    );

    res.status(200).json({ status: "success", user: updatedUser });
  } catch (err) {
    next(err);
  }
};

exports.deactivateMe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { active: false });
    res.status(204).json({ status: "success", message: "user deactivated" });
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  let { page, limit, search } = req.query;

  page = page || 1;
  limit = limit || 4;
  let skip = (page - 1) * limit;
  try {
    const totalDocs = await User.countDocuments({
      name: { $regex: search || "", $options: "i" },
    });
    const users = await User.find({
      $and: [
        {
          name: { $regex: search || "", $options: "i" },
          active: true,
        },
      ],
    })
      .limit(limit)
      .skip(skip)
      .select("name email");

    const totalPages = Math.ceil(totalDocs / limit);

    res
      .status(200)
      .json({ status: "success", results: users.length, users, totalPages });
  } catch (err) {
    next(err);
  }
};

exports.getSuggestions = async (req, res, next) => {
  let { keys, page, limit } = req.query;
  page = page || 1;
  limit = limit || 4;
  let skip = (page - 1) * limit;
  try {
    const suggestions = await User.find({
      $and: [
        {
          name: { $regex: keys, $options: "i" },
          active: true,
        },
      ],
    })
      .skip(skip)
      .select("name");
    res
      .status(200)
      .json({ status: "success", results: suggestions.length, suggestions });
  } catch (err) {
    next(err);
  }
};
