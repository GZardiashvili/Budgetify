const express = require('express');
const PiggyBank = require('../models/piggy-bank');

const router = express.Router();

router.get('/:accountId', (req, res) => {
    PiggyBank.find({accountId: req.params.accountId}, (err, piggyBanks) => {
        res.status(200).send(piggyBanks);
    }).clone()
});

router.get('/:accountId/:id', (req, res) => {
    PiggyBank.findOne({_id: req.params.id, accountId: req.params.accountId}, (err, piggyBank) => {
        res.status(200).send(piggyBank);
    }).clone()
});

router.post('/create', (req, res) => {
    const body = req.body;

    const piggyBank = new PiggyBank({
        accountId: body.accountId,
        title: body.title,
        goal: body.goal,
        description: body.description,
        savings: body.savings,
        crashDate: body.crashDate,
    });
    piggyBank
        .save()
        .then((savedPiggyBank) => {
            res.json(savedPiggyBank);
        })
        .catch((error) => {
            console.error('The Promise is rejected!', error);
        });
});

router.delete('/:id', (req, res) => {
    PiggyBank.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch((error) => {
            console.error('The Promise is rejected!', error);
        });
});

router.put('/:accountId/:id', (req, res) => {
    const body = req.body;

    const piggyBank = {
        accountId: body.accountId,
        goal: body.goal,
        description: body.description,
        savings: body.savings,
        crashDate: body.crashDate,
    }

    PiggyBank.findOneAndUpdate({
        _id: req.params.id,
        accountId: req.params.accountId
    }, piggyBank, {new: true}, (err, updatedPiggyBank) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(updatedPiggyBank);
        }
    }).clone().catch((error) => {
        console.error('The Promise is rejected!', error);
    });
});

module.exports = router;
