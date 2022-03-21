const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: String,
  accountId: String,
  title: String,
  description: String,
  dateOfOperation: Date,
  category: String,
  currency: String,
  amount: Number,
  linkToFile: String,
  dateOfCreation: Date,
  dateOfUpdate: Date,
});

transactionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);
