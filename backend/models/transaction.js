const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    accountId: String,
    type: String,
    title: {
        type: String,
        maxlength: 128,
        required: true,
        index: {
            unique: true,
            collation: {locale: 'en', strength: 2},
        },
    },
    description: {type: String},
    payee: String,
    dateOfOperation: Date,
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }],
    amount: {type: Number, required: true},
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
