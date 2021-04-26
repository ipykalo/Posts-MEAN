const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Token', 'Accsess Token');
    console.log('First execution');
    next();
});

app.get('/', (req, res) => {
    res.send('success');
});

app.get('/array', (req, res) => {
    res.send([0, 1, 2, 3]);
});

module.exports = app;