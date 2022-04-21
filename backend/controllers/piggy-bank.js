const express = require('express');
const PiggyBank = require('../models/piggy-bank');
const bindUser = require("../utils/bindUser");

const router = express.Router();

router.get('/:accountId', (req, res) => {
    PiggyBank.find({
            user: bindUser(req, res).id,
            accountId: req.params.accountId
        },
        (err, piggyBanks) => {
            res.status(200).send(piggyBanks);
        }).clone()
});

router.get('/:accountId/:id', (req, res) => {
    PiggyBank.findOne({
            user: bindUser(req, res).id,
            accountId: req.params.accountId,
            _id: req.params.id,
        },
        (err, piggyBank) => {
            res.status(200).send(piggyBank);
        }).clone()
});

router.post('/create', (req, res) => {
    const body = req.body;

    const piggyBank = new PiggyBank({
        user: bindUser(req, res).id,
        accountId: body.accountId,
        goal: body.goal,
        goalAmount: body.goalAmount,
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

router.delete('/delete/:id', (req, res) => {
    PiggyBank.findOneAndDelete({
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

    const piggyBank = {
        accountId: body.accountId,
        goal: body.goal,
        goalAmount: body.goalAmount,
        description: body.description,
        savings: body.savings,
        crashDate: body.crashDate,
    }

    PiggyBank.findOneAndUpdate({
        user: bindUser(req, res).id,
        _id: req.params.id
    }, piggyBank, {new: true})
        .then((updatedPiggyBank) => {
            res.json(updatedPiggyBank);
        })
        .catch((error) => {
            console.error('The Promise is rejected!', error);
        });
});

module.exports = router;
