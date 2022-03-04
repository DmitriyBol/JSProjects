const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();
const PORT = config.get('PORT') || 5000;
const MONGO_DB_LINK = config.get('mongoURI');

app.use(express.json({extended: true}));
app.use('/api/auth', require('./routes/auth.routes'));

const start = async () => {
    try {
        await mongoose.connect(MONGO_DB_LINK, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log(`app has been started at port ${PORT}`)
        })
    } catch (e) {
        process.exit(1);
        console.error('ERROR formed on server launch: ', e);
    }
}

start();

