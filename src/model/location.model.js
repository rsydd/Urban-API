const mongoose = require('mongoose');

const locationScheme = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    description: {type: String},
    slug: {type: String, required: true, lowercase: true, trim: true},
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
    countryId: {type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true},
    city: {type: String, required: true, trim: true},
    status: {type: String, enum: ['abandoned', 'restored', 'demolished', 'restricted'], default: 'abandoned'},
    condition: {type: String, enum: ['good', 'damaged', 'deteriorating', 'ruined'], default: 'good'},
    yearAbandoned: {type: Number, min: 0}
})

module.exports = mongoose.model('Location', locationScheme);