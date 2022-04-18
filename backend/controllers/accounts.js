const express = require('express');
const Account = require('../models/account');
const Transaction = require("../models/transaction");
const bindUser = require("../utils/bindUser");

const router = express.Router();

router.get('/:id', (req, res) => {
    Account.find({
        user: bindUser(req, res).id,
    }, (err, accounts) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(accounts);
        }
    }).clone().catch((error) => {
        console.error('The Promise is rejected!', error);
    });
});

router.get('/:id', (req, res) => {
    Account.findOne({
        user: bindUser(req, res).id,
        id: req.params.id
    }, (err, account) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(account);
        }
    }).clone().catch((error) => {
        console.error('The Promise is rejected!', error);
    });
});
router.post('/create', (req, res) => {
    const body = req.body;

    const account = new Account({
        userId: body.userId,
        title: body.title,
        description: body.description,
        category: body.category,
        currency: body.currency,
        availableAmount: body.availableAmount,
        dateOfCreation: body.dateOfCreation,
        dateOfUpdate: body.dateOfUpdate,
    });
    account
        .save()
        .then((savedAccount) => {
            res.json(savedAccount);
        })
        .catch((error) => {
            console.error('The Promise is rejected!', error);
        });
});

router.delete('/delete/:id', (req, res) => {
    Account.findOneAndDelete({
        user: bindUser(req, res).id,
        id: req.params.id
    })
        .then(() => {
            res.status(204).end();
        })
        .catch((error) => {
            console.error('The Promise is rejected!', error);
        });
});

router.put('update/:id', (req, res) => {
    const body = req.body;

    const account = {
        userId: body.userId,
        title: body.title,
        description: body.description,
        category: body.category,
        currency: body.currency,
        availableAmount: body.availableAmount,
        dateOfCreation: body.dateOfCreation,
        dateOfUpdate: body.dateOfUpdate,
    };
    Account.findOneAndUpdate({
        user: bindUser(req, res).id,
        id: req.params.id
    }, account, {new: true})
        .then((updatedAccount) => {
            res.json(updatedAccount);
        })
        .catch((error) => {
            console.error('The Promise is rejected!', error);
        });
});

module.exports = router;
