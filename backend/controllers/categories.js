const express = require('express');
const Category = require('../models/category');
const bindUser = require("../utils/bindUser");

const router = express.Router();

router.get('/find/:search?', (req, res) => {
    Category.find({
        user: bindUser(req, res).id,
        $or: [
            {
                title: {
                    $regex: req.query.search,
                    $options: 'i'
                }
            },
        ]
    }, (err, Categories) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(Categories);
        }
    }).clone().catch((error) => {
        console.error('The Promise is rejected!', error);
    });
});

router.get('/:id', (req, res) => {
    Category.findOne({
        user: bindUser(req, res).id,
        _id: req.params.id
    }, (err, category) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(category);
        }
    }).clone().catch((error) => {
        console.error('The Promise is rejected!', error);
    });
});

router.post('/create', (req, res) => {
    const body = req.body;

    const category = new Category({
        user: bindUser(req, res).id,
        title: body.title,
        type: body.type,
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

router.delete('/delete/:id', (req, res) => {
    Category.findOneAndDelete({
        user: bindUser(req, res).id,
        _id: req.params.id
    })
        .then(() => {
            res.status(204).end();
        })
        .catch((error) => {
            console.error('The Promise is rejected!', error);
        });
});

router.put('/update/:id', (req, res) => {
    const body = req.body;

    const category = {
        title: body.title, type: body.type,
    };
    Category
        .findOneAndUpdate({
            user: bindUser(req, res).id,
            _id: req.params.id
        }, category, {new: true})
        .then((updatedCategory) => {
            res.json(updatedCategory);
        })
        .catch((error) => {
            console.error('The Promise is rejected!', error);
        });
});

module.exports = router;
