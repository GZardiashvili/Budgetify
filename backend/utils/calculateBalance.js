function calculateBalance(transactions) {
    let balance = 0;
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].type === 'incomes') {
            balance += transactions[i].amount;
        } else if (transactions[i].type === 'expenses') {
            balance -= transactions[i].amount;
        }
    }
    return balance;
}

module.exports = calculateBalance;
