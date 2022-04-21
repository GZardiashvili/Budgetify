const express = require('express');
const Account = require('../models/account');
const bindUser = require("../utils/bindUser");

const router = express.Router();

router.get('/', (req, res) => {
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

router.get('/:accountId', (req, res) => {
    Account.findOne({
        user: bindUser(req, res).id,
        _id: req.params.accountId
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
        user: bindUser(req, res).id,
        title: body.title,
        description: body.description,
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

router.delete('/delete/:accountId', (req, res) => {
    Account.findOneAndDelete({
        user: bindUser(req, res).id,
        _id: req.params.accountId
    })
        .then(() => {
            res.status(204).end();
        })
        .catch((error) => {
            console.error('The Promise is rejected!', error);
        });
});

router.put('/update/:accountId', (req, res) => {
    const body = req.body;

    const account = {
        user: body.user,
        title: body.title,
        description: body.description,
        currency: body.currency,
        availableAmount: body.availableAmount,
        dateOfCreation: body.dateOfCreation,
        dateOfUpdate: body.dateOfUpdate,
    };
    Account.findOneAndUpdate({
        user: bindUser(req, res).id,
        _id: req.params.accountId
    }, account, {new: true})
        .then((updatedAccount) => {
            res.json(updatedAccount);
        })
        .catch((error) => {
            console.error('The Promise is rejected!', error);
        });
});

module.exports = router;
