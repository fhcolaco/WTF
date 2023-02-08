const express = require("express");
const router = express.Router();
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const upload = require("../middleware/upload");
const generateToken = require("../config/generateToken");
const isAuth = require("../middleware/auth");

//GET ALL method
router.get("/", (req, res) => {
  User.find().then((result) => {
    if (result === null)
      res.status(400).send("O utilizador não foi encontrado");
    else res.status(200).send(result);
  });
});

//GET ONE method
router.get("/:id", async (req, res) => {
  User.findOne({ _id: req.params.id }).then((result) => {
    if (result === null)
      res.status(400).send("O utilizador não foi encontrado");
    else res.status(200).send(result);
  });
});

// REGISTER method
router.post("/", upload.single("files"), async (req, res) => {
  const user = req.body.user;
  const userExists = await User.findOne({ user });
  if (userExists) {
    res.status(402).json({ message: "Utilizador já existe" });
    throw new Error("Utilizador já existe");
  }
  let userSave = {
    user: req.body.user,
    pass: req.body.pass,
    is_admin: req.body.is_admin,
    name: req.body.name,
    email: req.body.email,
    location: req.body.location,
    address: req.body.address,
    postal_code: req.body.postal_code,
    phone: req.body.phone,
    fiscal_number: req.body.fiscal_number,
    credit_card: req.body.credit_card,
    image: req.files?.map((file) => file.filename),
  };
  User.create(userSave)
    .then((user) => {
      res.status(200).json({
        id: user._id,
        name: user.name,
        avatar: user.image,
        is_admin: user.is_admin,
        token: generateToken({
          id: user._id,
          name: user.name,
          avatar: user.image,
          is_admin: user.is_admin,
        }),
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ message: error.message });
    });
});

//PUT method
router.put("/:id", isAuth, upload.single("image"), async (req, res) => {
  let userSave = {
    user: req.body.user,
    pass: req.body.pass,
    is_admin: req.body.is_admin,
    name: req.body.name,
    email: req.body.email,
    location: req.body.location,
    address: req.body.address,
    postal_code: req.body.postal_code,
    phone: req.body.phone,
    fiscal_number: req.body.fiscal_number,
    credit_card: req.body.credit_card,
  };
  if (req.file !== undefined) {
    userSave["image"] = req.file.filename;
  }
  User.findOneAndUpdate({ _id: req.params.id }, userSave)
    .then((user) => {
      res.status(200).send(user.name + " foi atualizado");
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

//DELETE method
router.delete("/:id", isAuth, async (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).send(result.name + " foi removido da base de dados");
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

module.exports = router;
