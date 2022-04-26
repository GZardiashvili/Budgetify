const express = require('express');
const Transaction = require('../models/transaction');
const router = express.Router();
const bindUser = require('../utils/bindUser');

router.get('/:accountId/find/:search?', async (req, res) => {
    const transactions = await Transaction.find({
        user: bindUser(req, res).id,
        accountId: req.params.accountId,
        $or: [
            {
                title: {
                    $regex: req.query.search,
                    $options: 'i'
                }
            },
        ]
    })
        .populate('category')
    res.status(200).send(transactions);
});

router.get('/:accountId/:id', async (req, res) => {
    const transaction = await Transaction.findOne({
        user: bindUser(req, res).id,
        accountId: req.params.accountId,
        _id: req.params.id
    })
        .populate('category')
    res.status(200).send(transaction);

});

router.post('/:accountId', async (req, res) => {
    const body = req.body;

    const transaction = new Transaction({
        user: bindUser(req, res).id,
        accountId: req.params.accountId,
        type: body.type,
        title: body.title,
        description: body.description,
        payee: body.payee,
        dateOfOperation: body.dateOfOperation,
        category: body.category,
        currency: body.currency,
        amount: body.amount,
        linkToFile: body.linkToFile,
        dateOfCreation: body.dateOfCreation,
        dateOfUpdate: body.dateOfUpdate,
    });

    const savedTransaction = await transaction.save();
    res.status(200).send(savedTransaction);
});

router.delete('/:id', (req, res) => {
    Transaction.findOneAndDelete({
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

    const transaction = {
        type: body.type,
        accountId: body.accountId,
        title: body.title,
        description: body.description,
        payee: body.payee,
        dateOfOperation: body.dateOfOperation,
        category: body.category,
        amount: body.amount,
        linkToFile: body.linkToFile,
        dateOfCreation: body.dateOfCreation,
        dateOfUpdate: body.dateOfUpdate,
    };

    Transaction.findOneAndUpdate({
        user: bindUser(req, res).id,
        _id: req.params.id
    }, transaction, {new: true})
        .then((updatedTransaction) => {
            res.json(updatedTransaction);
        })
        .catch((error) => {
            console.error('The Promise is rejected!', error);
        });
});

module.exports = router;
