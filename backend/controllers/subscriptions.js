const express = require('express');
const Subscription = require('../models/subscription');
const bindUser = require('../utils/bindUser');

const router = express.Router();

router.get('/:accountId', (req, res) => {
    Subscription.find({
            user: bindUser(req, res).id,
            accountId: req.params.accountId
        },
        (err, subscriptions) => {
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
    Subscription.findById({
        user: bindUser(req, res).id,
        account: req.params.accountId,
        _id: req.params.id
    }, (err, subscription) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(subscription);
        }
    }).clone().catch((error) => {
        console.error('The Promise is rejected!', error);
    });
});

router.post('/create/:accountId', (req, res) => {
    const body = req.body;

    const subscription = new Subscription({
        user: bindUser(req, res).id,
        accountId: req.params.accountId,
        title: body.title,
        description: body.description,
        firstDateOfPayment: body.firstDateOfPayment,
        lastDateOfPayment: body.lastDateOfPayment,
        dateOfPayment: body.dateOfPayment,
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

router.delete('/delete/:id', (req, res) => {
    Subscription.findOneAndDelete({
        user: bindUser(req, res).id,
        _id: req.params.id
    }).then(() => {
        res.status(204).end();
    });
});

router.put('/update/:id', (req, res) => {
    const body = req.body;

    const subscription = {
        accountId: body.accountId,
        title: body.title,
        description: body.description,
        firstDateOfPayment: body.firstDateOfPayment,
        lastDateOfPayment: body.lastDateOfPayment,
        dateOfPayment: body.dateOfPayment,
        category: body.category,
        currency: body.currency,
        amount: body.amount,
        dateOfCreation: body.dateOfCreation,
        dateOfUpdate: body.dateOfUpdate,
    };
    Subscription.findOneAndUpdate({
        user: bindUser(req, res).id,
        _id: req.params.id
    }, subscription, {new: true})
        .then((updatedSubscription) => {
            res.json(updatedSubscription);
        })
        .catch((error) => {
            console.error('The Promise is rejected!', error);
        });
});

module.exports = router;
