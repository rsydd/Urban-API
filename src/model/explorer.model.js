const mongoose = require('mongoose');

const explorerSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    username: {type: String, required: true, unique: true, lowercase: true, trim: true},
    email: {type: String, required: true, unique: true, lowercase: true, trim: true},
    bio: {type: String, trim: true}
}, {
    timestamps: true
});

module.exports = mongoose.model('Explorer', explorerSchema);