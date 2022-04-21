function translateForStatistic(transactions) {
    const incomesTr = transactions.filter((el) => el.type === 'incomes');
    const expensesTr = transactions.filter((el) => el.type === 'expenses');
    const incomes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const expenses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const expensesByCategory = []
    const incomesByCategory = []

    const calculateExp = expensesTr.reduce((acc, cur) => {
        cur.category.forEach((cat) => {
            if (!acc[cat]) {
                acc[cat] = 0;
            }
            acc[cat] += cur.amount;
        });
        return acc;
    }, {});
    Object.entries(calculateExp).forEach(([key, value]) => {
        expensesByCategory.push({category: key, amount: value});
    });

    const calculateInc = incomesTr.reduce((acc, cur) => {
        cur.category.forEach((cat) => {
            if (!acc[cat]) {
                acc[cat] = 0;
            }
            acc[cat] += cur.amount;
        });
        return acc;
    }, {});
    Object.entries(calculateInc).forEach(([key, value]) => {
        incomesByCategory.push({category: key, amount: value});
    });

    incomesTr.reduce((acc, el) => {
        switch (new Date(el.dateOfOperation).getMonth() + 1) {
            case 1:
                incomes[0] += el.amount;
                break;
            case 2:
                incomes[1] += el.amount;
                break;
            case 3:
                incomes[2] += el.amount;
                break;
            case 4:
                incomes[3] += el.amount;
                break;
            case 5:
                incomes[4] += el.amount;
                break;
            case 6:
                incomes[5] += el.amount;
                break;
            case 7:
                incomes[6] += el.amount;
                break;
            case 8:
                incomes[7] += el.amount;
                break;
            case 9:
                incomes[8] += el.amount;
                break;
            case 10:
                incomes[9] += el.amount;
                break;
            case 11:
                incomes[10] += el.amount;
                break;
            default:
                incomes[11] += el.amount;
                break;
        }
    }, 0);
    expensesTr.reduce((acc, el) => {
        switch (new Date(el.dateOfOperation).getMonth() + 1) {
            case 1:
                expenses[0] += el.amount;
                break;
            case 2:
                expenses[1] += el.amount;
                break;
            case 3:
                expenses[2] += el.amount;
                break;
            case 4:
                expenses[3] += el.amount;
                break;
            case 5:
                expenses[4] += el.amount;
                break;
            case 6:
                expenses[5] += el.amount;
                break;
            case 7:
                expenses[6] += el.amount;
                break;
            case 8:
                expenses[7] += el.amount;
                break;
            case 9:
                expenses[8] += el.amount;
                break;
            case 10:
                expenses[9] += el.amount;
                break;
            case 11:
                expenses[10] += el.amount;
                break;
            default:
                expenses[11] += el.amount;
                break;
        }
    }, 0);

    const economy = incomes.map((el, i) => el - expenses[i]);
    return {
        incomes,
        expenses,
        economy,
        incomesByCategory,
        expensesByCategory,
    };
}

module.exports = translateForStatistic;
