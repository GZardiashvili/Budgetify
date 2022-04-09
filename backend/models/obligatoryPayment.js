const mongoose = require('mongoose');

const obligatoryPaymentSchema = new mongoose.Schema({
    userId: String,
    title: {type: String, required: true},
    description: String,
    amount: {type: Number, required: true},
    currency: String,
    dayOfPayment: Date,
    frequency: String,
    firstDayOfPayment: Date,
    lastDayOfPayment: Date,
    dateOfCreation: Date,
    dateOfUpdate: Date,
});

obligatoryPaymentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model('ObligatoryPayment', obligatoryPaymentSchema);
