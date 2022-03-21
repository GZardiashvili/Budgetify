const express = require('express');
require('dotenv').config();
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const { jwtCallback } = require('./auth/passport');
const { adminGuard } = require('./guards/adminGuard');

const accountRouter = require('./controllers/accounts');
const categoryRouter = require('./controllers/categories');
const currencyRouter = require('./controllers/currencies');
const obligatoryPaymentRouter = require('./controllers/obligatoryPayments');
const subscriptionRouter = require('./controllers/subscriptions');
const transactionRouter = require('./controllers/transactions');
const usersRouter = require('./controllers/users');
const loginRouter = require('./auth/login');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(opts, jwtCallback));

const auth = passport.authenticate('jwt', { session: false });

app.use('/account', auth, accountRouter);
app.use('/category', auth, categoryRouter);
app.use('/currency', auth, currencyRouter);
app.use('/obligatoryPayment', auth, obligatoryPaymentRouter);
app.use('/subscription', auth, subscriptionRouter);
app.use('/transaction', auth, transactionRouter);
app.use('/user', auth, adminGuard, usersRouter);
app.use('/login', loginRouter);

const url = process.env.MONGODB_URI;
mongoose.connect(url);

app.listen(process.env.PORT);
