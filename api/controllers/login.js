const express = require("express");
const router = express.Router();
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");

// LOGIN method
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { user, pass } = req.body;
    const checkUser = await User.findOne({ user });
    if (checkUser) {
      checkUser.matchPassword(pass).then((result) => {
        if (result) {
          const token = generateToken({
            id: checkUser._id,
            name: checkUser.name,
            isAdmin: checkUser.is_admin,
            avatar: checkUser.image,
          });
          return res.status(200).json({
            success: true,
            message: "LoggedIn Successfully",
            data: {
              name: checkUser.name,
              id: checkUser._id,
              isAdmin: checkUser.is_admin,
              avatar: checkUser.image,
              token: token,
            },
          });
        } else {
          res.status(401).json({ message: "Password incorreta" });
        }
      });
    } else {
      res.status(401).json({ message: "Utilizador não existe" });
    }
  })
);

module.exports = router;
