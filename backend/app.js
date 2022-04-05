const express = require('express');
require('dotenv').config();
const cors = require('cors');
const passport = require('passport');

const {jwtCallback} = require('./auth/passport');
const {adminGuard} = require('./guards/adminGuard');

const accountRouter = require('./controllers/accounts');
const categoryRouter = require('./controllers/categories');
const currencyRouter = require('./controllers/currencies');
const obligatoryPaymentRouter = require('./controllers/obligatoryPayments');
const subscriptionRouter = require('./controllers/subscriptions');
const transactionRouter = require('./controllers/transactions');
const usersRouter = require('./controllers/users');
const loginRouter = require('./auth/login');
const registerRouter = require('./controllers/register');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(opts, jwtCallback));

const auth = passport.authenticate('jwt', {session: false});

app.use('/accounts', auth, accountRouter);
app.use('/categories', auth, categoryRouter);
app.use('/currencies', auth, currencyRouter);
app.use('/obligatoryPayments', auth, obligatoryPaymentRouter);
app.use('/subscriptions', auth, subscriptionRouter);
app.use('/transactions', auth, transactionRouter);
app.use('/users', auth, adminGuard, usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);


module.exports = app;
