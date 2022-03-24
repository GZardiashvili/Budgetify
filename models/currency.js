const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
  name: { type: String, required: true },
  sign: { type: String, required: true },
});

currencySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Currency', currencySchema);
