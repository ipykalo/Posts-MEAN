const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect(process.env.MONGO_DRIVER, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('Connected to db!')
    })
    .catch(() => {
        console.log('Connection to db failed!')
    });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/images/', express.static(path.join('backend/images'))); //allow acces to images

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Request-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;