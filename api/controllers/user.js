const express = require("express");
const router = express.Router();
const User = require("../models/user");
const upload = require("../middleware/upload");

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

// POST method
router.post("/", upload.single("image"), async (req, res) => {
  userSave = {
    user: req.body.user,
    pass: req.body.pass,
    is_admin: req.body.is_admin,
    name: req.body.name,
    email: req.body.email,
    billing_address: req.body.billing_address,
    phone: req.body.phone,
    fiscal_number: req.body.fiscal_number,
    credit_card: req.body.credit_card,
    image: req.file.filename,
  };
  User.create(userSave)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

//PUT method
router.put("/:id", upload.single("image"), async (req, res) => {
  userSave = {
    user: req.body.user,
    pass: req.body.pass,
    is_admin: req.body.is_admin,
    name: req.body.name,
    email: req.body.email,
    billing_address: req.body.billing_address,
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
router.delete("/:id", async (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).send(result.name + " foi removido da base de dados");
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

module.exports = router;
