const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  accountId: String,
  firstDayOfPayment: Date,
  lastDayOfPayment: Date,
  dayOfPayment: Date,
  category: String,
  currency: String,
  amount: Number,
  dateOfCreation: Date,
  dateOfUpdate: Date,
});

subscriptionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
