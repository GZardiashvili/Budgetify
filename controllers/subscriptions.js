const express = require('express');
const Subscription = require('../models/subscription');

const router = express.Router();

router.get('/:id', (req, res) => {
  Subscription.findById(req.params.id)
    .then((subscription) => {
      if (subscription) {
        res.json(subscription);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.error('The Promise is rejected!', error);
    });
});

router.post('/', (req, res) => {
  const body = req.body;

  const subscription = new Subscription({
    accountId: body.accountId,
    firstDayOfPayment: body.firstDayOfPayment,
    lastDayOfPayment: body.lastDayOfPayment,
    dayOfPayment: body.dayOfPayment,
    category: body.category,
    currency: body.currency,
    amount: body.amount,
    dateOfCreation: body.dateOfCreation,
    dateOfUpdate: body.dateOfUpdate,
  });
  subscription
    .save()
    .then((savedSubscription) => {
      res.json(savedSubscription);
    })
    .catch((error) => {
      console.error('The Promise is rejected!', error);
    });
});

router.delete('/:id', (req, res) => {
  Subscription.findByIdAndRemove(req.params.id).then(() => {
    res.status(204).end();
  });
});

router.put('/:id', (req, res) => {
  const body = req.body;

  const subscription = {
    accountId: body.accountId,
    firstDayOfPayment: body.firstDayOfPayment,
    lastDayOfPayment: body.lastDayOfPayment,
    dayOfPayment: body.dayOfPayment,
    category: body.category,
    currency: body.currency,
    amount: body.amount,
    dateOfCreation: body.dateOfCreation,
    dateOfUpdate: body.dateOfUpdate,
  };
  Subscription.findByIdAndUpdate(req.params.id, subscription, {
    new: true,
  })
    .then((updatedSubscription) => {
      res.json(updatedSubscription);
    })
    .catch((error) => {
      console.error('The Promise is rejected!', error);
    });
});

module.exports = router;
