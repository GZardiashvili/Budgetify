const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
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
    currency: {type: String, required: true},
    availableAmount: {type: Number},
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
