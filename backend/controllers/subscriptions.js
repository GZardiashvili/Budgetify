const express = require('express');
const Subscription = require('../models/subscription');

const router = express.Router();

router.get('/:accountId', (req, res) => {
    Subscription.find({accountId: req.params.accountId}, (err, subscriptions) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(subscriptions);
        }
    }).clone().catch((error) => {
        console.error('The Promise is rejected!', error);
    });
});

router.get('/:accountId/:id', (req, res) => {
    Subscription.findOne({_id: req.params.id, accountId: req.params.accountId}, (err, subscription) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(subscription);
        }
    }).clone().catch((error) => {
        console.error('The Promise is rejected!', error);
    });
});

router.post('/', (req, res) => {
    const body = req.body;

    const subscription = new Subscription({
        accountId: body.accountId,
        title: body.title,
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
