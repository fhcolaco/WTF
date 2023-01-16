const express = require("express");
const router = express.Router();
const Hotel = require("../models/hotel");

//GET ALL method
router.get("/", (req, res) => {
  Hotel.find().then((result) => {
    if (result === null)
      res.status(400).json({ error: "O hotel não foi encontrado" });
    else res.status(200).send(result);
  });
});

//GET ONE method
router.get("/:id", async (req, res) => {
  Hotel.findOne({ _id: req.params.id }).then((result) => {
    if (result === null)
      res.status(400).json({ error: "O hotel não foi encontrado" });
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
    _services: req.body.services,
    images: req.body.images,
  })
    .then((hotel) => {
      res.status(200).send(hotel);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

//PUT method
router.put("/:id", async (req, res) => {
  Hotel.findOneAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      location: req.body.location,
      description: req.body.description,
      _hotel_type: req.body._hotel_type,
      _services: req.body._services,
      images: req.body.images,
    }
  )
    .then((hotel) => {
      res.status(200).send(hotel);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

//DELETE method
router.delete("/:id", async (req, res) => {
  Hotel.findOneAndDelete({ _id: req.params.id })
    .then((hotel) => {
      res.status(200).send(hotel);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

module.exports = router;
