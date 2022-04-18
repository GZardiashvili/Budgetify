const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    accountId: String,
    title: {type: String, required: true, unique: true},
    firstDateOfPayment: {type: Date, required: true},
    lastDateOfPayment: Date,
    dateOfPayment: {type: Date, required: true},
    category: [{type: String, required: true}],
    currency: {type: String, required: true},
    amount: {type: Number, required: true},
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
