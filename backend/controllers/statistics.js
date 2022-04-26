const express = require('express');
const Statistics = require('../models/statistics');
const bindUser = require("../utils/bindUser");
const Transaction = require('../models/transaction');
const translateForStatistic = require("../utils/translateForStatistics");
const router = express.Router();

router.get('/:accountId', async (req, res) => {
    const transactions = await Transaction.find({
        user: bindUser(req, res).id,
        accountId: req.params.accountId,
    }).populate('category');

    const {incomes, expenses, economy, incomesByCategory, expensesByCategory, incomesExpenses} = translateForStatistic(transactions);
    res.json({
        incomes,
        expenses,
        economy,
        incomesByCategory,
        expensesByCategory,
        incomesExpenses
    });
});

router.get('/:accountId/:id', (req, res) => {
    Statistics.findOne({
        user: bindUser(req, res).id,
        accountId: req.params.accountId,
        _id: req.params.id,
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
