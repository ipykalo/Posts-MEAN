const express = require('express');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb+srv://ipyka:hV2VuDQK9NoUEQGI@cluster0.xxmcv.mongodb.net/node-angulr?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to db!')
    })
    .catch(() => {
        console.log('Connection to db failed!')
    });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Request-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use(express.json());

app.post("/api/posts", (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save()
        .then(() => {
            res.status(201).json({ message: 'Post added successfully!' });
        });
});

app.get('/api/posts', (req, res) => {
    Post.find()
        .then(posts => {
            res.status(200).json({ message: 'Posts fetched successfully!', posts });
        });
});

app.delete('/api/posts/:id', (req, res) => {
    Post.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({ message: 'Post deleted successfully!' });
        });
});

app.put('/api/posts/:id', (req, res) => {
    const post = new Post({
        _id: req.body._id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({ _id: req.params.id }, post)
        .then(() => {
            res.status(200).json({ message: 'Post updated successfully!' });
        });
});

module.exports = app;