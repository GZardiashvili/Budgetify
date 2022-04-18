const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    accountId: String,
    title: {type: String, required: true},
    fromDate: {type: Date, required: true},
    toDate: {type: Date, required: true},
    expansePerCategory: [
        {
            categoryId: String,
            categoryName: String,
            expanse: Number,
        },
    ],
    percentagePerCategory: [
        {
            categoryId: String,
            categoryName: String,
            percentage: Number,
        },
    ],
});

statisticsSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model('Statistic', statisticsSchema);
