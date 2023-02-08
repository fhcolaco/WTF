const User = require("../models/user");
const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Por favor fazer o login para aceder a esta página");
    }
    const verify = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(verify.id);
    if (!req.user) {
      throw new Error(
        "Por favor fazer o login como administrador para aceder a esta página"
      );
    } else if (req.user.is_admin === false) {
      throw new Error("Não autorizado");
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = isAuth;
