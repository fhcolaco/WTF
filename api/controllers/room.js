const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const upload = require("../middleware/upload");

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
router.post("/", upload.array("images"), (req, res) => {
  let roomSave = {
    _hotel: req.body._hotel,
    _room_category: req.body._room_category,
    _room_details: req.body._room_details,
    _services: req.body._services,
    price: req.body.price,
    discount: req.body.discount,
    isAvailable: req.body.isAvailable,
    description: req.body.description,
  };
  if (req.files !== undefined && req.files.length > 0)
    roomSave["images"] = req.files.map((file) => file.filename);
  Room.create(roomSave)
    .then((room) => {
      res.status(200).send(room);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

//PUT method
router.put("/:id", upload.array("images"), (req, res) => {
  let roomSave = {
    _hotel: req.body._hotel,
    _room_category: req.body._room_category,
    _room_details: req.body._room_details,
    _services: req.body._services,
    price: req.body.price,
    discount: req.body.discount,
    isAvailable: req.body.isAvailable,
    description: req.body.description,
  };
  if (req.files !== undefined && req.files.length > 0)
    roomSave["images"] = req.files.map((file) => file.filename);
  Room.findOneAndUpdate({ _id: req.params.id }, roomSave)
    .then((result) => {
      res.status(200).send("Quarto atualizado");
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
