const express = require('express');
const ObligatoryPayment = require('../models/obligatoryPayment');
const bindUser = require("../utils/bindUser");

const router = express.Router();

router.get('/:accountId/find/:search?', (req, res) => {
    ObligatoryPayment.find({
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
    }, (err, obligatoryPayments) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(obligatoryPayments);
        }
    }).clone().catch((error) => {
        console.error('The Promise is rejected!', error);
    });
});

router.get('/:accountId/:id', (req, res) => {
    ObligatoryPayment.findOne({
            user: bindUser(req, res).id,
            accountId: req.params.accountId,
            _id: req.params.id,
        },
        (err, obligatoryPayment) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(obligatoryPayment);
            }
        }).clone().catch((error) => {
        console.error('The Promise is rejected!', error);
    });
});

router.post('/create/:accountId', (req, res) => {
    const body = req.body;

    const obligatoryPayment = new ObligatoryPayment({
        user: bindUser(req, res).id,
        accountId: req.params.accountId,
        title: body.title,
        description: body.description,
        amount: body.amount,
        currency: body.currency,
        dateOfPayment: body.dateOfPayment,
        frequency: body.frequency,
        dateOfTheFirstPayment: body.dateOfTheFirstPayment,
        dateOfTheLastPayment: body.dateOfTheLastPayment,
        createdOn: body.createdOn,
        updatedOn: body.updatedOn,
    });
    obligatoryPayment.save().then((savedObligatoryPayment) => {
        res.json(savedObligatoryPayment);
    });
});

router.delete('/delete/:id', (req, res) => {
    ObligatoryPayment.findOneAndDelete({
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

router.put('/update/:id', (req, res) => {
    const body = req.body;

    const obligatoryPayment = {
        user: body.user,
        title: body.title,
        description: body.description,
        amount: body.amount,
        currency: body.currency,
        dayOfPayment: body.dayOfPayment,
        frequency: body.frequency,
        dateOfTheFirstPayment: body.dateOfTheFirstPayment,
        dateOfTheLastPayment: body.dateOfTheLastPayment,
        createdOn: body.createdOn,
        updatedOn: body.updatedOn,
    };
    ObligatoryPayment.findOneAndUpdate({
        user: bindUser(req, res).id,
        _id: req.params.id
    }, obligatoryPayment, {new: true})
        .then((updatedObligatoryPayment) => {
            res.json(updatedObligatoryPayment);
        })
        .catch((error) => {
            console.error('The Promise is rejected!', error);
        });
});

module.exports = router;
