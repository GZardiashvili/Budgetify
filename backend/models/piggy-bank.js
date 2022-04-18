const mongoose = require('mongoose');

const piggyBankSchema = new mongoose.Schema({
    accountId: {type: String, required: true},
    goal: {
        type: String,
        required: true
    },
    goalAmount: Number,
    description: String,
    savings: Number,
    crashDate: Date,
});

piggyBankSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model('piggyBank', piggyBankSchema);
