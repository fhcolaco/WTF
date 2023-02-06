const User = require("../models/user");
const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next(
        new Error("Por favor fazer o login para aceder a esta página")
      );
    }
    console.log(token);
    const verify = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(verify.id);
    if (!req.user) {
      return next(
        new Error(
          "Por favor fazer o login como administrador para aceder a esta página"
        )
      );
    } else if (req.user.is_admin === false) {
      return next(new Error("Não autorizado"));
    }
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = isAuth;
