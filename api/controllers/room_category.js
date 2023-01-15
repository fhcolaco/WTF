const express = require("express");
const router = express.Router();
const RoomCategory = require("../models/room_category");

//GET ALL method
router.get("/", (req, res) => {
  RoomCategory.find().then((result) => {
    if (result === null)
      res.status(400).send("A categoria de quarto não foi encontrada");
    else res.status(200).send(result);
  });
});

//GET ONE method
router.get("/:id", async (req, res) => {
  RoomCategory.findOne({ _id: req.params.id }).then((result) => {
    if (result === null)
      res.status(400).send("A categoria de quarto não foi encontrada");
    else res.status(200).send(result);
  });
});

//POST method
router.post("/", async (req, res) => {
  RoomCategory.create({
    name: req.body.name,
    description: req.body.description,
  }).then((room_category) => {
    res.status(200).send(room_category);
  });
});

//PUT method
router.put("/:id", async (req, res) => {
  RoomCategory.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
  }).then((room_category) => {
    res.status(200).send(room_category);
  });
});

//DELETE method
router.delete("/:id", async (req, res) => {
  RoomCategory.findByIdAndDelete(req.params.id).then((room_category) => {
    res.status(200).send(room_category);
  });
});

module.exports = router;
