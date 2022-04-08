const express = require('express');
const PiggyBank = require('../models/piggy-bank');

const router = express.Router();

router.get('/:accountId/:id?', (req, res) => {
    if (req.params.id) {
        PiggyBank.findById(req.params.id)
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
    } else {
        PiggyBank.find()
            .then((piggyBank) => {
                if (piggyBank) {
                    res.json(piggyBank.filter((piggyBank) => piggyBank.accountId === req.params.accountId));
                } else {
                    res.status(404).end();
                }
            })
            .catch((error) => {
                console.error('The Promise is rejected!', error);
            });
    }
});

router.post('/create', (req, res) => {
    const body = req.body;

    const piggyBank = new PiggyBank({
        accountId: body.accountId,
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

router.delete('/:accountId/:id', (req, res) => {
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
        .then((updatedTransaction) => {
            res.json(updatedTransaction);
        })
        .catch((error) => {
            console.error('The Promise is rejected!', error);
        });
});

module.exports = router;
