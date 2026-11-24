const mongoose = require('mongoose');

async function connectDb(uri) {
    await mongoose.connect(uri);
    console.log(`MongoDB Connected : ${mongoose.connection.host}/${mongoose.connection.name}`);
}

module.exports = connectDb;