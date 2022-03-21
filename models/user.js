const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
  firstName: String,
  lastName: String,
  gender: String,
  dateOfBirth: String,
  countryOfResidence: String,
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('User', userSchema);
