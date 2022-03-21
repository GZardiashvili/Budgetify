const express = require('express');
const Transaction = require('../models/transaction');

const router = express.Router();

router.get('/:id', (req, res) => {
  Transaction.findById(req.params.id).then((transaction) => {
    if (transaction) {
      res.json(transaction);
    } else {
      res.status(404).end();
    }
  });
});

router.post('/', (req, res) => {
  const body = req.body;

  const transaction = new Transaction({
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
  });
  transaction.save().then((savedTransaction) => {
    res.json(savedTransaction);
  });
});

router.delete('/:id', (req, res) => {
  Transaction.findByIdAndRemove(req.params.id).then(() => {
    res.status(204).end();
  });
});

router.put('/:id', (req, res) => {
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

  Transaction.findByIdAndUpdate(req.params.id, transaction, { new: true }).then(
    (updatedTransaction) => {
      res.json(updatedTransaction);
    }
  );
});

module.exports = router;
