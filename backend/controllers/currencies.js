const express = require('express');
const Currency = require('../models/currency');
const bindUser = require("../utils/bindUser");

const router = express.Router();

router.get('/:accountId', (req, res) => {
    Currency.find({
        user: bindUser(req, res).id,
        accountId: req.params.accountId
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

router.get('/:accountId/:id', (req, res) => {
    Currency.findOne({
        user: bindUser(req, res).id,
        account: req.params.accountId,
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

router.post('/create', (req, res) => {
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

router.delete('/delete/:id', (req, res) => {
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

router.put('/update/:id', (req, res) => {
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
