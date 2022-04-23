const express = require('express');
const Subscription = require('../models/subscription');
const bindUser = require('../utils/bindUser');

const router = express.Router();

router.get('/:accountId/find/:search?', async (req, res) => {
    const subscriptions = await Subscription.find({
        user: bindUser(req, res).id,
        accountId: req.params.accountId,
        $or: [
            {
                title: {
                    $regex: req.query.search,
                    $options: 'i'
                }
            }
        ]
    }).populate('category');
    res.status(200).send(subscriptions);
});

router.get('/:accountId/:id', async (req, res) => {
    const subscription = await Subscription.findOne({
        user: bindUser(req, res).id,
        accountId: req.params.accountId,
        _id: req.params.id
    }).populate('category');
    res.status(200).send(subscription);
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
