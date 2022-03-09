const express = require('express');
require('dotenv').config();

const accountRouter = require('./routes/account');
const categoryRouter = require('./routes/category');
const currencyRouter = require('./routes/currency');
const obligatoryPaymentRouter = require('./routes/obligatoryPayment');
const subscriptionRouter = require('./routes/subscription');
const transactionRouter = require('./routes/transaction');
const usersRouter = require('./routes/user');

const app = express();

app.use(express.json());

app.use('/account', accountRouter);
app.use('/category', categoryRouter);
app.use('/currency', currencyRouter);
app.use('/obligatoryPayment', obligatoryPaymentRouter);
app.use('/subscription', subscriptionRouter);
app.use('/transaction', transactionRouter);
app.use('/user', usersRouter);

app.listen(process.env.PORT || 3000);
