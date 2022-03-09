const express = require('express');
const db = require('../mockData/dummyDB');

const router = express.Router();

router.get('/:id', (req, res) => {
  const currency = db.currencies.filter(
    (currency) => currency.id === req.params.id
  );
  res.json({ currency });
});

router.post('/', (req, res) => {
  db.currencies.push(req.body);
  res.send('POST from currency');
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.currencies = db.currencies.filter((curr) => curr.id !== id);
  res.status(204).end();
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  db.currencies = db.currencies.map((curr) =>
    curr.id === id ? (curr = req.body) : ''
  );
  res.send('update from currency');
});

module.exports = router;
