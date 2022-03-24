const express = require('express');
const ObligatoryPayment = require('../models/obligatoryPayment');

const router = express.Router();

router.get('/:id', (req, res) => {
  ObligatoryPayment.findById(req.params.id).then((obligatoryPayment) => {
    if (obligatoryPayment) {
      res.json(obligatoryPayment);
    } else {
      res.status(404).end();
    }
  });
});

router.post('/', (req, res) => {
  const body = req.body;

  const obligatoryPayment = new ObligatoryPayment({
    userId: body.userId,
    title: body.title,
    description: body.description,
    amount: body.amount,
    currency: body.currency,
    dayOfPayment: body.dayOfPayment,
    frequency: body.frequency,
    dateOfTheFirstPayment: body.dateOfTheFirstPayment,
    dateOfThelastPayment: body.dateOfThelastPayment,
    createdOn: body.createdOn,
    updatedOn: body.updatedOn,
  });
  obligatoryPayment.save().then((savedObligatoryPayment) => {
    res.json(savedObligatoryPayment);
  });
});

router.delete('/:id', (req, res) => {
  ObligatoryPayment.findByIdAndRemove(req.params.id).then(() => {
    res.status(204).end();
  });
});

router.put('/:id', (req, res) => {
  const body = req.body;

  const obligatoryPayment = {
    userId: body.userId,
    title: body.title,
    description: body.description,
    amount: body.amount,
    currency: body.currency,
    dayOfPayment: body.dayOfPayment,
    frequency: body.frequency,
    dateOfTheFirstPayment: body.dateOfTheFirstPayment,
    dateOfThelastPayment: body.dateOfThelastPayment,
    createdOn: body.createdOn,
    updatedOn: body.updatedOn,
  };
  ObligatoryPayment.findByIdAndUpdate(req.params.id, obligatoryPayment, {
    new: true,
  }).then((updatedUser) => {
    res.json(updatedUser);
  });
});

module.exports = router;