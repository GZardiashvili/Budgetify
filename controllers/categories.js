const express = require('express');
const Category = require('../models/category');

const router = express.Router();

router.get('/:id', (req, res) => {
  Category.findById(req.params.id).then((category) => {
    if (category) {
      res.json(category);
    } else {
      res.status(404).end();
    }
  });
});

router.post('/', (req, res) => {
  const body = req.body;

  const category = new Category({
    title: body.title,
    type: body.type,
  });
  category.save().then((savedCategory) => {
    res.json(savedCategory);
  });
});

router.delete('/:id', (req, res) => {
  Category.findByIdAndRemove(req.params.id).then(() => {
    res.status(204).end();
  });
});

router.put('/:id', (req, res) => {
  const body = req.body;

  const category = {
    title: body.title,
    type: body.type,
  };
  category
    .findByIdAndUpdate(req.params.id, category, { new: true })
    .then((updatedCategory) => {
      res.json(updatedCategory);
    });
});

module.exports = router;
