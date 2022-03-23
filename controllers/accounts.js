const express = require('express');
const Account = require('../models/account');

const router = express.Router();

router.get('/:id?', (req, res) => {
  if (req.params.id) {
    Account.findById(req.params.id).then((account) => {
      if (account) {
        res.json(account);
      } else {
        res.status(404).end();
      }
    });
  } else {
    Account.find().then((account) => {
      if (account) {
        res.json(account);
      } else {
        res.status(404).end();
      }
    });
  }
});

router.post('/', (req, res) => {
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
  account.save().then((savedAccount) => {
    res.json(savedAccount);
  });
});

router.delete('/:id', (req, res) => {
  Account.findByIdAndRemove(req.params.id).then(() => {
    res.status(204).end();
  });
});

router.put('/:id', (req, res) => {
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
  Account.findByIdAndUpdate(req.params.id, account, { new: true }).then(
    (updatedAccount) => {
      res.json(updatedAccount);
    }
  );
});

module.exports = router;
