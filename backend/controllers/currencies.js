const express = require('express');
const Currency = require('../models/currency');
const bindUser = require("../utils/bindUser");

const router = express.Router();

router.get('/', (req, res) => {
    Currency.find({
        user: bindUser(req, res).id,
    }, (err, currencies) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(currencies);
        }
    }).clone().catch((error) => {
        console.error('The Promise is rejected!', error);
    });
});

router.get('/:id', (req, res) => {
    Currency.findOne({
        user: bindUser(req, res).id,
        _id: req.params.id
    }, (err, currency) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(currency);
        }
    }).clone().catch((error) => {
        console.error('The Promise is rejected!', error);
    });
});

router.post('/', (req, res) => {
    const body = req.body;

    const currency = new Currency({
        user: bindUser(req, res).id,
        name: body.name,
        sign: body.sign,
    });
    currency.save().then((savedCurrency) => {
        res.json(savedCurrency);
    });
});

router.delete('/:id', (req, res) => {
    Currency.findOneAndDelete({
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

router.put('/:id', (req, res) => {
    const body = req.body;

    const currency = {
        name: body.name, sign: body.sign,
    };
    Currency.findOneAndUpdate({
        _id: req.params.id
    }, currency, {new: true})
        .then((updatedCurrency) => {
            res.json(updatedCurrency);
        })
        .catch((error) => {
            console.error('The Promise is rejected!', error);
        });
});

module.exports = router;
