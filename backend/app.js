const express = require('express');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb+srv://ipyka:hV2VuDQK9NoUEQGI@cluster0.xxmcv.mongodb.net/node-angulr?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to db!')
    })
    .catch(() => {
        console.log('Connection failed!')
    });

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

app.use(express.json());

app.post("/api/posts", (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    res.status(201).json({ message: 'Post added successfully!' });
});

app.get('/api/posts', (req, res) => {
    const posts = Post.find().then(docs => {
        console.log(docs);
        res.status(200).json({ message: 'Success', posts: docs });
    });
});

module.exports = app;