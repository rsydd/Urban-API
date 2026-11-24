const mongoose = require('mongoose');

const explorationSchema = new mongoose.Schema({
    explorerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Explorer',
        required: true
    },
    
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },

    visitedAt: {
        type: Date,
        required: true
    },
    notes: {

        type: String,
        required: true, 
        trim: true
    },

    rating: {
        type: Number,
        min: 1,
        max: 10
    }
}, {timestamps: true});

module.exports = mongoose.model('Exploration', explorationSchema);