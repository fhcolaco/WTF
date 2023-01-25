const express = require("express");
const router = express.Router();
const Hotel = require("../models/hotel");
const upload = require("../middleware/upload");

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
router.post("/", upload.array("images"), (req, res) => {
  Hotel.create({
    name: req.body.name,
    location: req.body.location,
    description: req.body.description,
    _hotel_type: req.body._hotel_type,
    _services: req.body._services,
    images: req.files.map((file) => file.filename),
  })
    .then((hotel) => {
      res.status(200).send(hotel);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

//PUT method
router.put("/:id", upload.array("images"), (req, res) => {
  let hotelSave = {
    name: req.body.name,
    location: req.body.location,
    address: req.body.address,
    postal_code: req.body.postal_code,
    description: req.body.description,
    _hotel_type: req.body._hotel_type,
    _services: req.body._services,
  };
  if (req.files.length > 0)
    hotelSave["images"] = req.files.map((file) => file.filename);
  Hotel.findOneAndUpdate({ _id: req.params.id }, hotelSave)
    .then((hotel) => {
      res.status(200).send(hotel);
    })
    .catch((error) => {
      res.status(400).send({ message: error.message });
    });
});

//DELETE method
router.delete("/:id", (req, res) => {
  Hotel.findOneAndDelete({ _id: req.params.id })
    .then((hotel) => {
      res.status(200).send(hotel);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

module.exports = router;
