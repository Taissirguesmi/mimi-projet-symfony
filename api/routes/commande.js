const express = require("express");
const commande = require("../models/commande");
const router = express.Router();

router.get("/", (req, res, next) => {
  commande
    .find()
    .exec()
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  const newCommande = new commande({
    idCom: req.body.idCom,
    date: req.body.date,
    prixCom: req.body.prixCom,
  });

  newCommande
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /Commande",
        createdCommande: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:idCom", (req, res, next) => {
  const id = req.params.idCom;
  commande
    .find({ idCom: id })
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.put("/:idCom", function (req, res) {
  var ComId = req.params.idCom;
  commande.findOneAndUpdate(
    { idCom: ComId },
    { $set: req.body },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
      res.json(doc);
    }
  );
});

router.delete("/:idCom", (req, res, next) => {
  const id = req.params.idCom;
  commande
    .remove({ idCom: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
