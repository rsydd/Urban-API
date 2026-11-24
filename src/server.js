require('dotenv').config();

const express = require('express');
const connectDb = require('./config/db');
const app = require('./app');
const PORT = 3000;


(async () => {
    if(!process.env.DATABASE_URI) {
        console.log('Ga ada URI database mongoose nya dul, coba ditambahin dulu di .env.');
    }

    await connectDb(process.env.DATABASE_URI);
    app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
})

().catch((err) => {
    console.error('Ga bisa nyala server nya dul.', err.message);
    process.exit(1);
})