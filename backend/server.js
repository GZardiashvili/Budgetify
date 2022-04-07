require('dotenv').config();
const mongoose = require('mongoose');

const app = require('./app');

const url = process.env.MONGODB_URI;

mongoose.connect(url);

app.listen(process.env.PORT);
