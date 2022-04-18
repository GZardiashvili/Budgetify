const express = require('express');
const Transaction = require('../models/transaction');
const router = express.Router();
const bindUser = require('../utils/bindUser');

router.get('/:accountId', (req, res) => {
    Transaction.find({
        user: bindUser(req, res).id,
        accountId: req.params.accountId
    }, (err, transactions) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(transactions);
        }
    }).clone().catch((error) => {
        console.error('The Promise is rejected!', error);
    });
});

router.get('/:accountId/:id', (req, res) => {
    Transaction.findOne({
        user: bindUser(req, res).id,
        account: req.params.accountId,
        id: req.params.id
    }, (err, transaction) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(transaction);
        }
    }).clone().catch((error) => {
        console.error('The Promise is rejected!', error);
    });
});

router.post('/create', (req, res) => {
    const body = req.body;

    const transaction = new Transaction({
        user: bindUser(req, res).id,
        accountId: body.accountId,
        type: body.type,
        title: body.title,
        description: body.description,
        dateOfOperation: body.dateOfOperation,
        category: body.category,
        currency: body.currency,
        amount: body.amount,
        linkToFile: body.linkToFile,
        dateOfCreation: body.dateOfCreation,
        dateOfUpdate: body.dateOfUpdate,
    });
    transaction
        .save()
        .then((savedTransaction) => {
            res.json(savedTransaction);
        })
        .catch((error) => {
            console.error('The Promise is rejected!', error);
        });
});

router.delete('/delete/:id', (req, res) => {
    Transaction.findOneAndDelete({
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

router.put('/update/:id', (req, res) => {
    const body = req.body;

    const transaction = {
        type: body.type,
        accountId: body.accountId,
        title: body.title,
        description: body.description,
        dateOfOperation: body.dateOfOperation,
        category: body.category,
        currency: body.currency,
        amount: body.amount,
        linkToFile: body.linkToFile,
        dateOfCreation: body.dateOfCreation,
        dateOfUpdate: body.dateOfUpdate,
    };

    Transaction.findOneAndUpdate({
        user: bindUser(req, res).id,
        id: req.params.id
    }, transaction, {new: true})
        .then((updatedTransaction) => {
            res.json(updatedTransaction);
        })
        .catch((error) => {
            console.error('The Promise is rejected!', error);
        });
});

module.exports = router;
