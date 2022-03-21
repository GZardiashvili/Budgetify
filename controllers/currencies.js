const express = require('express');
const Currency = require('../models/currency');

const router = express.Router();

router.get('/:id', (req, res) => {
  Currency.findById(req.params.id).then((currency) => {
    if (currency) {
      res.json(currency);
    } else {
      res.status(404).end();
    }
  });
});

router.post('/', (req, res) => {
  const body = req.body;

  const currency = new Currency({
    name: body.name,
    sign: body.sign,
  });
  currency.save().then((savedCurrency) => {
    res.json(savedCurrency);
  });
});

router.delete('/:id', (req, res) => {
  Currency.findByIdAndRemove(req.params.id).then(() => {
    res.status(204).end();
  });
});

router.put('/:id', (req, res) => {
  const body = req.body;

  const currency = {
    name: body.name,
    sign: body.sign,
  };
  Currency.findByIdAndUpdate(req.params.id, currency, { new: true }).then(
    (updatedCurrency) => {
      res.json(updatedCurrency);
    }
  );
});

module.exports = router;
