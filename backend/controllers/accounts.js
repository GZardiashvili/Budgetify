const express = require('express');
const Account = require('../models/account');
const bindUser = require("../utils/bindUser");

const router = express.Router();

router.get('/', async (req, res) => {
    const accounts = await Account.find({
        user: bindUser(req, res).id,
    }).populate('currency');
    res.status(200).send(accounts);
});

router.get('/:accountId', async (req, res) => {
    const account = await Account.findOne({
        user: bindUser(req, res).id,
        _id: req.params.accountId
    }).populate('currency');
    res.status(200).send(account);
});
router.post('/', (req, res) => {
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

router.delete('/:accountId', (req, res) => {
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

router.put('/:accountId', (req, res) => {
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
