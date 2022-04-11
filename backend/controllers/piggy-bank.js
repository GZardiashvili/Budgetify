const express = require('express');
const PiggyBank = require('../models/piggy-bank');

const router = express.Router();

router.get('/:accountId', (req, res) => {
    PiggyBank.find({accountId: req.params.accountId}, (err, piggyBanks) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(piggyBanks);
        }
    }).catch((error) => {
        console.error('The Promise is rejected!', error);
    });
});

router.get('/:accountId/:id', (req, res) => {
    PiggyBank.findOne({_id: req.params.id, accountId: req.params.accountId}, (err, subscription) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(piggyBank);
        }
    }).catch((error) => {
        console.error('The Promise is rejected!', error);
    });
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

    PiggyBank.findByIdAndUpdate(req.params.id, piggyBank, {new: true})
        .then((piggyBank) => {
            if (piggyBank && piggyBank.accountId === req.params.accountId) {
                res.json(piggyBank);
            } else {
                res.status(404).end();
            }
        })
        .catch((error) => {
            console.error('The Promise is rejected!', error);
        });
});

module.exports = router;
