const express = require('express');
require('dotenv').config();
const cors = require('cors');

const accountRouter = require('./routes/features/account');
const categoryRouter = require('./routes/features/category');
const currencyRouter = require('./routes/features/currency');
const obligatoryPaymentRouter = require('./routes/features/obligatoryPayment');
const subscriptionRouter = require('./routes/features/subscription');
const transactionRouter = require('./routes/features/transaction');
const usersRouter = require('./routes/features/user');
const loginRouter = require('./routes/auth/login');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/account', accountRouter);
app.use('/category', categoryRouter);
app.use('/currency', currencyRouter);
app.use('/obligatoryPayment', obligatoryPaymentRouter);
app.use('/subscription', subscriptionRouter);
app.use('/transaction', transactionRouter);
app.use('/user', usersRouter);
app.use('/login', loginRouter);

app.listen(process.env.PORT);
