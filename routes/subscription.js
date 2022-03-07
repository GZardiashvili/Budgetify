const express = require('express');
const router = express.Router();
const db = require('../mockData/dummyDB');

router.get('/:id', (req, res) => {
  const subscription = db.subscriptions.filter(
    (subscription) => subscription.id === req.params.id
  );
  res.json({ subscription });
});

router.post('/', (req, res) => {
  db.subscriptions.push(req.body);
  res.send('POST from subscription');
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.subscriptions = db.subscriptions.filter((sub) => sub.id !== id);
  res.status(204).end();
});

router.patch('/:id', (req, res) => {
  const id = req.params.id;
  db.subscriptions = db.subscriptions.map((subscription) =>
    subscription.id === id ? (subscription = req.body) : ''
  );
  res.send('update from subscription');
});

module.exports = router;
