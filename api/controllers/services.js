const express = require("express");
const router = express.Router();
const Services = require("../models/services");

//GET ALL method

router.get("/", (req, res) => {
  Services.find().then((result) => {
    if (result === null) res.status(400).send("O serviço não foi encontrado");
    else res.status(200).send(result);
  });
});

//GET ONE method
router.get("/:id", async (req, res) => {
  Services.findOne({ _id: req.params.id }).then((result) => {
    if (result === null) res.status(400).send("O serviço não foi encontrado");
    else res.status(200).send(result);
  });
});

//POST method
router.post("/", async (req, res) => {
  Services.create({
    _service_type: req.body.service_type,
    _service_room: req.body.service_room,
    _hotels: req.body.hotels,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  }).then((service) => {
    res.status(200).send(service.name + " foi adicionado à base de dados");
  });
});

//PUT method
router.put("/:id", async (req, res) => {
  Services.findOneAndUpdate(
    { _id: req.params.id },
    {
      _service_type: req.body.service_type,
      _service_room: req.body.service_room,
      _hotels: req.body.hotels,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    }
  )
    .then((service) => {
      res.status(200).send(service.name + " foi atualizado");
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

//DELETE method
router.delete("/:id", async (req, res) => {
  Services.findOneAndDelete({ _id: req.params.id }).then((service) => {
    res.status(200).send(service.name + " foi removido da base de dados");
  });
});

module.exports = router;
