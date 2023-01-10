const express = require("express");
const router = express.Router();
const Reserve = require("../models/reserve");

//GET ALL method
router.get("/", (req, res) => {
  Reserve.find().then((result) => {
    if (result === null) res.status(400).send("A reserva não foi encontrada");
    else res.status(200).send(result);
  });
});

//GET ONE method
router.get("/:id", (req, res) => {
  Reserve.findById(req.params.id).then((result) => {
    if (result === null) res.status(400).send("A reserva não foi encontrada");
    else res.status(200).send(result);
  });
});

//POST method
router.post("/", (req, res) => {
  Reserve.create({
    _hotel: req.body.hotel,
    _user: req.body.user,
    _room: req.body.room,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    discount_percentage: req.body.discount_percentage,
    total_price: req.body.total_price,
    is_paid: req.body.is_paid,
    is_cancelled: req.body.is_cancelled,
  })
    .then((result) => {
      res.status(200).send(result._hotel + " foi adicionado à base de dados");
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

//PUT method
router.put("/:id", (req, res) => {
  Reserve.findByIdAndUpdate(req.params.id, {
    _hotel: req.body.hotel,
    _user: req.body.user,
    _room: req.body.room,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    discount_percentage: req.body.discount_percentage,
    total_price: req.body.total_price,
    is_paid: req.body.is_paid,
    is_cancelled: req.body.is_cancelled,
  })
    .then((result) => {
      hotel.status(200).send(result._hotel + " foi atualizado");
    })
    .catch((error) => {
      error.status(400).json({ message: error.message });
    });
});

//DELETE method
router.delete("/:id", (req, res) => {
  Reserve.findByIdAndDelete(req.params.id).then((result) => {
    if (result === null) res.status(400).send("A reserva não foi encontrada");
    else res.status(200).send(result);
  });
});

module.exports = router;
