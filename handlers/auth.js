const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function (req, res, next) {
  try {
    let user = await db.User.findOne({
      email: req.body.email
    });
    let { id, username, profileImageUrl } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          username,
          profileImageUrl
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Email or Password"
      });
    }
  } catch (e) {
    return next({ status: 400, message: "Invalid Email or Password" })
  }
}

exports.signup = async function (req, res, next) {
  try {
    // create user
    let user = await db.User.create(req.body);
    let { id, username, profileImageUrl } = user;
    // create a token (signing a token)
    let token = jwt.sign(
      {
        id,
        username,
        profileImageUrl
      },
      // pass in secret key
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    });
  } catch (err) {
    // if a validation fails
    if (err.code === 11000) {
      err.message = "Sorry, that username and/or email is already taken."
    }
    return next({
      status: 400,
      message: err.message
    })
  }
}