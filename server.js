const express = require('express');
require('dotenv').config();
const cors = require('cors');
const passport = require('passport');
const { jwtCallack } = require('./routes/auth/passport');

const accountRouter = require('./routes/features/account');
const categoryRouter = require('./routes/features/category');
const currencyRouter = require('./routes/features/currency');
const obligatoryPaymentRouter = require('./routes/features/obligatoryPayment');
const subscriptionRouter = require('./routes/features/subscription');
const transactionRouter = require('./routes/features/transaction');
const usersRouter = require('./routes/features/user');
const loginRouter = require('./routes/auth/login');

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

passport.use(new JwtStrategy(opts, jwtCallack));

const auth = passport.authenticate('jwt', { session: false });

app.use('/account', auth, accountRouter);
app.use('/category', auth, categoryRouter);
app.use('/currency', auth, currencyRouter);
app.use('/obligatoryPayment', auth, obligatoryPaymentRouter);
app.use('/subscription', auth, subscriptionRouter);
app.use('/transaction', auth, transactionRouter);
app.use('/user', auth, usersRouter);
app.use('/login', loginRouter);

app.listen(process.env.PORT);
