const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();
const PORT = config.get('port') || 5000;

app.use('/api/auth', require('./routes/auth.routes'))

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoURI'),  {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log(`app has been started at port ${PORT}`)
        })
    } catch (e) {
        process.exit(1);
        console.error('ERROR: ', e);
    }
}

start();

