const express = require("express");
const router = express.Router();
const HotelCategory = require("../models/hotel_category");

//GET ALL method
router.get("/", (req, res) => {
  HotelCategory.find().then((result) => {
    if (result === null) res.status(400).send("A categoria não foi encontrada");
    else res.status(200).send(result);
  });
});

//GET ONE method
router.get("/:id", (req, res) => {
  const ID = parseInt(req.params.id);
  HotelCategory.findOne({ cod: ID }).then((result) => {
    if (result === null) res.status(400).send("A categoria não foi encontrada");
    else res.status(200).send(result);
  });
});

//POST method
router.post("/", (req, res) => {
  HotelCategory.create({
    name: req.body.name,
    description: req.body.description,
  })
    .then((result) => {
      res.status(200).send(result.name + " foi adicionado à base de dados");
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

//PUT method
router.put("/:id", (req, res) => {
  const ID = parseInt(req.params.id);
  HotelCategory.findOneAndUpdate(
    { cod: ID },
    {
      name: req.body.name,
      description: req.body.description,
    }
  )
    .then((result) => {
      hotel.status(200).send(result.name + " foi atualizado");
    })
    .catch((error) => {
      error.status(400).json({ message: error.message });
    });
});

//DELETE method
router.delete("/:id", (req, res) => {
  const ID = parseInt(req.params.id);
  HotelCategory.findOneAndDelete({ cod: ID }).then((result) => {
    if (result === null) res.status(400).send("A categoria não foi encontrada");
    else res.status(200).send(result);
  });
});

module.exports = router;
