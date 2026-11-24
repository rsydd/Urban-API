const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    code: {type: String, required: true, unique: true, uppercase: true, mingLength: 2, maxLength: 2},
    continent: {type: String, required: true}
});

module.exports = mongoose.model('Country', countrySchema);