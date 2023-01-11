const express = require("express");
const router = express.Router();
const RoomDetail = require("../models/room_detail");

//GET ALL method
router.get("/", (req, res) => {
  RoomDetail.find().then((result) => {
    if (result === null) res.status(400).send("O quarto não foi encontrado");
    else res.status(200).send(result);
  });
});

//GET ONE method
router.get("/:id", async (req, res) => {
  RoomDetail.findOne({ _id: req.params.id }).then((result) => {
    if (result === null) res.status(400).send("O quarto não foi encontrado");
    else res.status(200).send(result);
  });
});

//POST method
router.post("/", async (req, res) => {
  RoomDetail.create({
    _room: req.body.room,
    details: req.body.details,
  }).then((room_detail) => {
    res.status(200).send(room_detail.name + " foi adicionado à base de dados");
  });
});

//PUT method
router.put("/:id", async (req, res) => {
  RoomDetail.findByIdAndUpdate(req.params.id, {
    _room: req.body.room,
    details: req.body.details,
  }).then((room_detail) => {
    res.status(200).send(room_detail.name + " foi atualizado");
  });
});

//DELETE method
router.delete("/:id", async (req, res) => {
  RoomDetail.findByIdAndDelete(req.params.id).then((room_detail) => {
    res.status(200).send(room_detail.name + " foi eliminado");
  });
});

module.exports = router;
