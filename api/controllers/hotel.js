const express = require("express");
const router = express.Router();
const Hotel = require("../models/hotel");
const upload = require("../middleware/upload");
const isAuth = require("../middleware/auth");

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
router.post("/", isAuth, upload.array("files"), (req, res) => {
  let hotelSave = {
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    address: req.body.address,
    postal_code: req.body.postal_code,
    _hotel_type: req.body._hotel_type,
    _services: req.body._services,
  };
  if (req.files || false) {
    hotelSave["images"] = req.files?.map((file) => file.filename);
  }
  Hotel.create(hotelSave)
    .then((hotel) => {
      res.status(200).send(hotel);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

//PUT method
router.put("/:id", isAuth, upload.array("files"), (req, res) => {
  let hotelSave = {
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    address: req.body.address,
    postal_code: req.body.postal_code,
    _hotel_type: req.body._hotel_type,
    _services: req.body._services,
  };
  if (req.files || false) {
    hotelSave["images"] = [
      ...req.body.images?.split(","),
      ...req.files?.map((file) => file.filename),
    ];
  }
  Hotel.findOneAndUpdate({ _id: req.params.id }, hotelSave)
    .then(() => {
      res
        .status(200)
        .json({ Success: true, message: "Hotel atualizado com sucesso" });
    })
    .catch((error) => {
      res.status(400).send({ message: error.message });
    });
});

//DELETE method
router.delete("/:id", isAuth, (req, res) => {
  Hotel.findOneAndDelete({ _id: req.params.id })
    .then((hotel) => {
      res.status(200).send(hotel);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

module.exports = router;
