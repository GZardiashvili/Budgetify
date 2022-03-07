const express = require('express');
const router = express.Router();
const db = require('../mockData/dummyDB');

router.get('/:id', (req, res) => {
  const obligatoryPayment = db.obligatoryPayments.filter(
    (obligatoryPayment) => obligatoryPayment.id === req.params.id
  );
  res.json({ obligatoryPayment });
});

router.post('/', (req, res) => {
  db.obligatoryPayments.push(req.body);
  res.send('POST from obligatoryPayment');
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.obligatoryPayments = db.obligatoryPayments.filter((op) => op.id !== id);
  res.status(204).end();
});

router.patch('/:id', (req, res) => {
  const id = req.params.id;
  db.obligatoryPayments = db.obligatoryPayments.map((obligatoryPayment) =>
    obligatoryPayment.id === id ? (obligatoryPayment = req.body) : ''
  );
  res.send('update from obligatoryPayment');
});

module.exports = router;
