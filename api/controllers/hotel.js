const express = require("express");
const router = express.Router();
const Hotel = require("../models/hotel");

//GET ALL method
router.get("/", (req, res) => {
  Hotel.find().then((result) => {
    if (result === null) res.status(400).send("O hotel não foi encontrado");
    else res.status(200).send(result);
  });
});

//GET ONE method
router.get("/:id", async (req, res) => {
  const ID = parseInt(req.params.id);
  Hotel.findOne({ cod: ID }).then((result) => {
    if (result === null) res.status(400).send("O hotel não foi encontrado");
    else res.status(200).send(result);
  });
});

//POST method
router.post("/", async (req, res) => {
  Hotel.create({
    name: req.body.name,
    location: req.body.location,
    description: req.body.description,
    _hotel_type: req.body.hotel_type,
  })
    .then((hotel) => {
      res.status(200).send(hotel.nome + " foi adicionado à base de dados");
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

//PUT method
router.put("/:id", async (req, res) => {
  const ID = parseInt(req.params.id);
  Hotel.findOneAndUpdate(
    { cod: ID },
    {
      name: req.body.name,
      location: req.body.location,
      description: req.body.description,
      _hotel_type: req.body.hotel_type,
    }
  )
    .then((hotel) => {
      res.status(200).send(hotel.nome + " foi atualizado");
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

//DELETE method
router.delete("/:id", async (req, res) => {
  const ID = parseInt(req.params.id);
  Hotel.findOneAndDelete({ cod: ID })
    .then((hotel) => {
      res.status(200).send(hotel.nome + " foi removido da base de dados");
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

module.exports = router;
