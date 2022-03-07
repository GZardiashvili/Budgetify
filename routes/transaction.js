const express = require('express');
const router = express.Router();
const db = require('../mockData/dummyDB');

router.get('/:id', (req, res) => {
  const transaction = db.transactions.filter(
    (transaction) => transaction.id === req.params.id
  );
  res.json({ transaction });
});

router.post('/', (req, res) => {
  db.transactions.push(req.body);
  res.send('POST from transaction');
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.transactions = db.transactions.filter((tr) => tr.id !== id);
  res.status(204).end();
});

router.patch('/:id', (req, res) => {
  const id = req.params.id;
  db.transactions = db.transactions.map((transaction) =>
    transaction.id === id ? (transaction = req.body) : ''
  );
  res.send('update from transaction');
});

module.exports = router;
