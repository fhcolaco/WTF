const express = require("express");
const router = express.Router();
const Room = require("../models/room");

//GET ALL method
router.get("/", (req, res) => {
  Room.find().then((result) => {
    if (result === null) res.status(400).send("O quarto não foi encontrado");
    else res.status(200).send(result);
  });
});

//GET ONE method
router.get("/:id", async (req, res) => {
  Room.findById(req.params.id).then((result) => {
    if (result === null) res.status(400).send("O quarto não foi encontrado");
    else res.status(200).send(result);
  });
});

//POST method
router.post("/", async (req, res) => {
  Room.create({
    _hotel: req.body.hotel,
    _room_category: req.body.room_category,
    _room_details: req.body.room_details,
    _services: req.body.services,
    atual_price: req.body.atual_price,
    old_price: req.body.old_price,
    isDiscount: req.body.isDiscount,
    isAvailable: req.body.isAvailable,
    description: req.body.description,
  }).then((room) => {
    res.status(200).send(room.name + " foi adicionado à base de dados");
  });
});

//PUT method
router.put("/:id", async (req, res) => {
  Room.findOneAndUpdate(
    { _id: req.params.id },
    {
      _hotel: req.body.hotel,
      _room_category: req.body.room_category,
      _room_details: req.body.room_details,
      _services: req.body.services,
      atual_price: req.body.atual_price,
      old_price: req.body.old_price,
      isDiscount: req.body.isDiscount,
      isAvailable: req.body.isAvailable,
      description: req.body.description,
    }
  )
    .then((result) => {
      res.status(200).send(result.name + " foi atualizado");
    })
    .catch((err) => {
      res.status(400).send("O quarto não foi encontrado");
    });
});

//DELETE method
router.delete("/:id", async (req, res) => {
  Room.findOneAndDelete({ _id: req.params.id }).then((result) => {
    if (result === null) res.status(400).send("O quarto não foi encontrado");
    else res.status(200).send(result.name + " foi removido da base de dados");
  });
});

module.exports = router;
