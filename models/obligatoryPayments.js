const mongoose = require('mongoose');

const obligatoryPaymentSchema = new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  amount: Number,
  currency: String,
  dayOfPayment: Date,
  frequency: String,
  dateOfTheFirstPayment: Date,
  dateOfThelastPayment: Date,
  createdOn: Date,
  updatedOn: Date,
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('ObligatoryPayment', obligatoryPaymentSchema);
