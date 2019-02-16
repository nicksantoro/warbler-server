require("dotenv").load();
const jwt = require("jsonwebtoken");

// make sure user is logged in - Authentication
// are you credentials correct? have been you logged in before?
exports.loginRequired = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET.KEY, function (err, decoded) {
      if (decoded) {
        return next();
      } else {
        return next({
          status: 401,
          message: "Please log in first"
        });
      }
    })
  } catch (e) {
    return next({
      status: 401,
      message: "Please log in first"
    })
  }
};

// make sure we get the correct user - Authorization
// are you allowed to do this?
exports.ensureCorrectUser = function (req, res, next) { };

