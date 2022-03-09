const express = require('express');
const db = require('../mockData/dummyDB');

const router = express.Router();

router.get('/:id', (req, res) => {
  const account = db.accounts.filter((account) => account.id === req.params.id);
  res.json({ account });
});

router.post('/', (req, res) => {
  db.accounts.push(req.body);
  res.send('POST from account');
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.accounts = db.accounts.filter((acc) => acc.id !== id);
  res.status(204).end();
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  db.accounts = db.accounts.map((acc) =>
    acc.id === id ? (acc = req.body) : ''
  );
  res.send('update from account');
});

module.exports = router;
