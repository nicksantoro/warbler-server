require("dotenv").load();
const jwt = require("jsonwebtoken");

// make sure user is logged in with valid token - Authentication
// are your credentials correct? have been you logged in before?
exports.loginRequired = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (decoded) {
        return next();
      } else {
        return next({ status: 401, message: "Please log in first" });
      }
    });
  } catch (e) {
    return next({ status: 401, message: "Please log in first" });
  }
};

// make sure we get the correct user - Authorization
// users can't modify messages of other users
// are you allowed to do this?
exports.ensureCorrectUser = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (decoded && decoded.id === req.params.id) {
        return next();
      } else {
        return next({ status: 401, message: "Unauthorized" });
      }
    });
  } catch (e) {
    return next({ status: 401, message: "Unauthorized" })
  }
};

