const express = require('express');
const db = require('../mockData/dummyDB');

const router = express.Router();

router.get('/:id', (req, res) => {
  const user = db.users.filter((user) => user.id === req.params.id);
  res.json({ user });
});

router.post('/', (req, res) => {
  db.users.push(req.body);
  res.send('POST from user');
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.users = db.users.filter((user) => user.id !== id);
  res.status(204).end();
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  db.users = db.users.map((user) => (user.id === id ? (user = req.body) : ''));
  res.send('update from user');
});

module.exports = router;
