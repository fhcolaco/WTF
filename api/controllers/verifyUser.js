const User = require("../models/user");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

// TEST IF USER IS AUTHORIZED
router.get(
  "/",
  asyncHandler(async (req, res) => {
    if (
      !req.headers.authorization ||
      req.headers.authorization === "Bearer null"
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Não autorizado" });
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next(
        new Error("Por favor fazer o login para aceder a esta página")
      );
    }
    console.log(process.env.JWT_SECRET);
    const verify = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(verify.id);
    console.log(req.user);
    return res.status(200).json({ success: true, message: "Autorizado" });
  })
);

module.exports = router;
