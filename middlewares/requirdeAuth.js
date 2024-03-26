const asyncHandler = require("express-async-handler");
const jsend = require("jsend");
const jwt = require("jsonwebtoken");
require("dotenv").config("../.env");

const requireAuth = asyncHandler(async (req, res, next) => {
  // get auth from headers
  const { authorization } = req.headers;
  // handle Error if not exists auth
  if (!authorization) {
    return res.status(401).json(jsend.error("You Must be Logged in"));
  }
  // get token from auth
  const token = authorization.split(" ")[1];
  // verify jwt for token
  await jwt.verify(token, process.env.TOKEN_SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).json(jsend.error("You Must be Logged in two"));
    }

    const { id } = payload;

    req.userId = id;
  });

  next();
});

module.exports = requireAuth;
