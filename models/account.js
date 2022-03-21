const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  category: String,
  currency: String,
  availableAmount: Number,
  dateOfCreation: Date,
  dateOfUpdate: Date,
});

accountSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Account', accountSchema);
