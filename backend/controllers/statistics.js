const express = require('express');
const Statistics = require('../models/statistics');

const router = express.Router();

router.get('/:accountId', (req, res) => {
    Statistics.find({
        accountId: req.params.accountId,
    }).then((statistics) => {
        if (statistics) {
            res.send(statistics);
        } else {
            res.sendStatus(404);
        }
    }).catch((error) => {
        console.error('The Promise is rejected!', error);
    });
});

router.get('/:accountId/:id', (req, res) => {
    Statistics.findOne({
        _id: req.params.id,
        accountId: req.params.accountId,
    }).then((statistics) => {
        if (statistics) {
            res.send(statistics);
        } else {
            res.sendStatus(404);
        }
    }).catch((error) => {
        console.error('The Promise is rejected!', error);
    });
});

module.exports = router;
