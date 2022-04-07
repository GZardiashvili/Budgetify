const express = require('express');
const Category = require('../models/category');

const router = express.Router();

router.get('/:id?', (req, res) => {
    if (req.params.id) {

        Category.findById(req.params.id)
            .then((category) => {
                if (category) {
                    res.json(category);
                } else {
                    res.status(404).end();
                }
            })
            .catch((error) => {
                console.error('The Promise is rejected!', error);
            });
    } else {
        Category.find()
            .then((categories) => {
                if (categories) {
                    res.json(categories);
                } else {
                    res.status(404).end();
                }
            })
            .catch((error) => {
                console.error('The Promise is rejected!', error);
            });
    }
});

router.post('/', (req, res) => {
    const body = req.body;

    const category = new Category({
        title: body.title, type: body.type,
    });
    category
        .save()
        .then((savedCategory) => {
            res.json(savedCategory);
        })
        .catch((error) => {
            console.error('The Promise is rejected!', error);
        });
});

router.delete('/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch((error) => {
            console.error('The Promise is rejected!', error);
        });
});

router.put('/:id', (req, res) => {
    const body = req.body;

    const category = {
        title: body.title, type: body.type,
    };
    category
        .findByIdAndUpdate(req.params.id, category, {new: true})
        .then((updatedCategory) => {
            res.json(updatedCategory);
        })
        .catch((error) => {
            console.error('The Promise is rejected!', error);
        });
});

module.exports = router;
