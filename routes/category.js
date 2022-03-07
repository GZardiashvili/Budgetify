const express = require('express');
const router = express.Router();
const db = require('../mockData/dummyDB');

router.get('/:id', (req, res) => {
  const category = db.categories.filter(
    (category) => category.id === req.params.id
  );
  res.json({ category });
});

router.post('/', (req, res) => {
  db.categories.push(req.body);
  res.send('POST from categories');
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.categories = db.categories.filter((cat) => cat.id !== id);
  res.status(204).end();
});

router.patch('/:id', (req, res) => {
  const id = req.params.id;
  db.categories = db.categories.map((cat) =>
    cat.id === id ? (cat = req.body) : ''
  );
  res.send('update from category');
});

module.exports = router;
