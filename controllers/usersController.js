const asyncHandler = require("express-async-handler");
const jsend = require("jsend");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Joi = require("joi");
const bcrypt = require("bcrypt");
require("../.env");

const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const Schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org"] },
    }),
    password: Joi.string().min(6).max(30),
  });
  const { error } = Schema.validate(req.body);
  if (error) {
    return res.status(401).json(jsend.error(error.details[0].message));
  }

  const foundUser = await User.findOne({ email }).exec();
  if (foundUser) {
    return res.status(401).json({ message: "User already exists" });
  }

  const hashedpassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedpassword,
  });

  const Token = jwt.sign({ id: newUser._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });

  res
    .status(200)
    .json(
      jsend.success({ info: "register success", Token, email: newUser.email })
    );
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) {
    return res.status(401).json({
      message:
        "User does not register, Please make sure that the email or password is correct",
    });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) return res.status(401).json({ message: "Wrong Password" });

  const Token = jwt.sign({ id: foundUser._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });

  res
    .status(200)
    .json(
      jsend.success({ info: "Logged success", Token, email: foundUser.email })
    );
});

module.exports = {
  register,
  login,
};
