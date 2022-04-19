const mongoose = require('mongoose');

const obligatoryPaymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    accountId: String,
    title: {
        type: String,
        maxlength: 128,
        required: true,
        index: {
            unique: true,
            collation: {locale: 'en', strength: 2},
        },
    },
    description: String,
    amount: {type: Number, required: true},
    currency: String,
    dateOfPayment: Date,
    frequency: String,
    firstDateOfPayment: Date,
    lastDateOfPayment: Date,
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
