const express = require('express');
const fs = require('fs');
const nunjucks = require('nunjucks');
const nodemon = require('nodemon');
const basicAuth = require('express-basic-auth');

const app = express();

app.set('view engine', 'njk');
nunjucks.configure('views', {
    express: app,
    autoescape: true,
});

app.use(express.json());
app.use(express.static('/public'));
app.use(basicAuth({
    realm: 'Web.',
    challenge: true,
    users: {
        admin: '1234',
    }
}))

const messageData = [];

app.post('/all', (req, res) => {
    const data = req.body;
    messageData.push(data.value + data.secondValue);
    res.json({ messageData });
    location.reload();
})




/* GET home page. */
app.get('/', (req, res) => {
    res.render('index', { messageData });
});


/* PORTS and OTHER */
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`  Listening on http://localhost:${port}`)
})

module.exports = app;