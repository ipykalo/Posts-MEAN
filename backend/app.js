const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Request-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.use('/api/posts', (req, res, next) => {
    const posts = [
        { id: 1, title: 'First Post', content: 'The Post is coming from the server NodJs' },
        { id: 2, title: 'Second Post', content: 'The Post is coming from the server NodJs' },
        { id: 3, title: 'Third Post', content: 'The Post is coming from the server NodJs' },
    ]
    res.status(200).json({ message: 'Success', posts });
});

module.exports = app;