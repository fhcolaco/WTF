const express = require("express");
const router = express.Router();
const User = require("../models/user");

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
  const ID = parseInt(req.params.id);
  User.findOne({ _id: ID }).then((result) => {
    if (result === null)
      res.status(400).send("O utilizador não foi encontrado");
    else res.status(200).send(result);
  });
});

// POST method
router.post("/", async (req, res) => {
  User.create({
    user: req.body.user,
    pass: req.body.pass,
    is_admin: req.body.is_admin,
    name: req.body.name,
    email: req.body.email,
    billing_address: req.body.billing_address,
    phone: req.body.phone,
    fiscal_number: req.body.fiscal_number,
    credit_card: req.body.credit_card,
  })
    .then((user) => {
      res.status(200).send(user.nome + " foi adicionado à base de dados");
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

//PUT method
router.put("/:id", async (req, res) => {
  const ID = parseInt(req.params.id);
  User.findOneAndUpdate(
    { _id: ID },
    {
      user: req.body.user,
      pass: req.body.pass,
      is_admin: req.body.is_admin,
      name: req.body.name,
      email: req.body.email,
      billing_address: req.body.billing_address,
      phone: req.body.phone,
      fiscal_number: req.body.fiscal_number,
      credit_card: req.body.credit_card,
    }
  )
    .then((user) => {
      res.status(200).send(user.nome + " foi atualizado");
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

//DELETE method
router.delete("/:id", async (req, res) => {
  const ID = parseInt(req.params.id);
  User.findByIdAndDelete({ _id: ID })
    .then((result) => {
      res.status(200).send("O utilizador foi eliminado com sucesso");
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

module.exports = router;
