const express = require("express");
const isAuth = require("../middleware/auth");
const router = express.Router();
const HotelCategory = require("../models/hotel_category");

//GET ALL method
router.get("/", (req, res) => {
  HotelCategory.find().then((result) => {
    if (result === null)
      res.status(400).json({ error: "A categoria não foi encontrada" });
    else res.status(200).send(result);
  });
});

//GET ONE method
router.get("/:id", (req, res) => {
  HotelCategory.findOne({ _id: req.params.id })
    .then((result) => {
      if (result === null)
        res.status(400).json({ error: "A categoria não foi encontrada" });
      else res.status(200).send(result);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

//POST method
router.post("/", (req, res) => {
  HotelCategory.create({
    name: req.body.name,
    description: req.body.description,
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

//PUT method
router.put("/:id", isAuth, (req, res) => {
  HotelCategory.findOneAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
  })
    .then((result) => {
      hotel.status(200).send(result);
    })
    .catch((error) => {
      error.status(400).json({ message: error.message });
    });
});

//DELETE method
router.delete("/:id", isAuth, (req, res) => {
  HotelCategory.findOneAndDelete(req.params.id).then((result) => {
    if (result === null) res.status(400).send("A categoria não foi encontrada");
    else res.status(200).send(result);
  });
});

module.exports = router;
