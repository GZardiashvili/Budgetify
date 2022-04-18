const express = require('express');
const Statistics = require('../models/statistics');
const bindUser = require("../utils/bindUser");

const router = express.Router();

router.get('/:accountId', (req, res) => {
    Statistics.find({
        user: bindUser(req, res).id,
        accountId: req.params.accountId,
    }).then((statistics) => {
        if (statistics) {
            res.send(statistics);
        } else {
            res.sendStatus(404);
        }
    }).clone().catch((error) => {
        console.error('The Promise is rejected!', error);
    });
});

router.get('/:accountId/:id', (req, res) => {
    Statistics.findOne({
        user: bindUser(req, res).id,
        accountId: req.params.accountId,
        id: req.params.id,
    }).then((statistics) => {
        if (statistics) {
            res.send(statistics);
        } else {
            res.sendStatus(404);
        }
    }).clone().catch((error) => {
        console.error('The Promise is rejected!', error);
    });
});

module.exports = router;
