const express = require("express");
const router = express.Router();
const ServicesCategory = require("../models/services_category");

//GET ALL method
router.get("/", (req, res) => {
  ServicesCategory.find().then((result) => {
    if (result === null)
      res.status(400).send("A categoria de serviço não foi encontrada");
    else res.status(200).send(result);
  });
});

//GET ONE method
router.get("/:id", async (req, res) => {
  ServicesCategory.findOne({ _id: req.params.id }).then((result) => {
    if (result === null)
      res.status(400).send("A categoria de serviço não foi encontrada");
    else res.status(200).send(result);
  });
});

//POST method
router.post("/", async (req, res) => {
  ServicesCategory.create({
    name: req.body.name,
    description: req.body.description,
  }).then((services_category) => {
    res
      .status(200)
      .send(services_category.name + " foi adicionado à base de dados");
  });
});

//PUT method
router.put("/:id", async (req, res) => {
  ServicesCategory.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
  }).then((services_category) => {
    res.status(200).send(services_category.name + " foi atualizado");
  });
});

//DELETE method
router.delete("/:id", async (req, res) => {
  ServicesCategory.findByIdAndDelete(req.params.id).then(
    (services_category) => {
      res.status(200).send(services_category.name + " foi eliminado");
    }
  );
});

module.exports = router;
