const express = require('express');
const Statistics = require('../models/statistics');

const router = express.Router();

router.get('/:accountId/:id?', (req, res) => {
    if (req.params.id) {
        Statistics.findById(req.params.id)
            .then((statistics) => {
                if (statistics && statistics.accountId === req.params.accountId) {
                    res.json(statistics);
                } else {
                    res.status(404).end();
                }
            })
            .catch((error) => {
                console.error('The Promise is rejected!', error);
            });
    } else {
        Statistics.find()
            .then((statistics) => {
                if (statistics) {
                    res.json(statistics.filter((statistics) => statistics.accountId === req.params.accountId));
                } else {
                    res.status(404).end();
                }
            })
            .catch((error) => {
                console.error('The Promise is rejected!', error);
            });
    }
});

module.exports = router;
