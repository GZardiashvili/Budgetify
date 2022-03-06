const express = require('express');
const router = express.Router();
const db = require('../mockData/dummyDB');

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

router.patch('/:id', (req, res) => {
  const id = req.params.id;
  db.accounts = db.accounts.map((acc) =>
    acc.id === id ? (acc = req.body) : ''
  );
  res.send('update from account');
});

module.exports = router;
