const express = require('express');
const ObligatoryPayment = require('../models/obligatoryPayment');

const router = express.Router();

router.get('/:accountId', (req, res) => {
    ObligatoryPayment.find({accountId: req.params.accountId}, (err, obligatoryPayments) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(obligatoryPayments);
        }
    }).catch((error) => {
        console.error('The Promise is rejected!', error);
    });
});

router.get('/:accountId/:id', (req, res) => {
    ObligatoryPayment.findOne({_id: req.params.id, accountId: req.params.accountId}, (err, obligatoryPayment) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(obligatoryPayment);
        }
    }).catch((error) => {
        console.error('The Promise is rejected!', error);
    });
});

router.post('/', (req, res) => {
    const body = req.body;

    const obligatoryPayment = new ObligatoryPayment({
        userId: body.userId,
        title: body.title,
        description: body.description,
        amount: body.amount,
        currency: body.currency,
        dayOfPayment: body.dayOfPayment,
        frequency: body.frequency,
        dateOfTheFirstPayment: body.dateOfTheFirstPayment,
        dateOfTheLastPayment: body.dateOfThelastPayment,
        createdOn: body.createdOn,
        updatedOn: body.updatedOn,
    });
    obligatoryPayment.save().then((savedObligatoryPayment) => {
        res.json(savedObligatoryPayment);
    });
});

router.delete('/:id', (req, res) => {
    ObligatoryPayment.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch((error) => {
            console.error('The Promise is rejected!', error);
        });
});

router.put('/:id', (req, res) => {
    const body = req.body;

    const obligatoryPayment = {
        userId: body.userId,
        title: body.title,
        description: body.description,
        amount: body.amount,
        currency: body.currency,
        dayOfPayment: body.dayOfPayment,
        frequency: body.frequency,
        dateOfTheFirstPayment: body.dateOfTheFirstPayment,
        dateOfThelastPayment: body.dateOfThelastPayment,
        createdOn: body.createdOn,
        updatedOn: body.updatedOn,
    };
    ObligatoryPayment.findByIdAndUpdate(req.params.id, obligatoryPayment, {
        new: true,
    })
        .then((updatedUser) => {
            res.json(updatedUser);
        })
        .catch((error) => {
            console.error('The Promise is rejected!', error);
        });
});

module.exports = router;
