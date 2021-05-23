const express = require('express');
const multer = require('multer');
const { count } = require('../models/post');

const Post = require('../models/post');

const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let error = MIME_TYPE_MAP[file.mimetype] ? null : new Error('Invalid mime type');
        cb(error, 'backend/images');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, `${name}-${Date.now()}.${ext}`);
    }
});

router.post("", multer({ storage }).single("image"), (req, res) => {
    const url = `${req.protocol}://${req.get('host')}`
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        path: `${url}/images/${req.file.filename}`
    });
    post.save()
        .then(() => {
            res.status(201).json({ message: 'Post added successfully!' });
        });
});

router.get('', (req, res) => {
    const pageSize = +req.query.pageSize;
    const page = +req.query.page;
    const query = Post.find();
    let fetchedPosts;

    if ((pageSize || pageSize === 0) && (page || page === 0)) {
        query
            .skip(pageSize * (page === 0 ? page : page - 1))
            .limit(pageSize)
    }

    query
        .then(posts => {
            fetchedPosts = posts;
            return Post.count();
        })
        .then(count => {
            res.status(200).json({
                message: 'Posts fetched successfully!',
                posts: fetchedPosts,
                totalPosts: count
            });
        });
});

router.get("/:id", (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (post) {
                res.status(200).json(post);
                return;
            }
            res.status(404).json({ message: 'Post not feund!' })
        });
});

router.delete("/:id", (req, res) => {
    Post.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({ message: 'Post deleted successfully!' });
        });
});

router.put("/:id", multer({ storage }).single("image"), (req, res) => {
    const url = `${req.protocol}://${req.get('host')}`
    const post = new Post({
        _id: req.body._id,
        title: req.body.title,
        content: req.body.content,
        path: `${url}/images/${req.file.filename}`
    });
    Post.updateOne({ _id: req.params.id }, post)
        .then(() => {
            res.status(200).json({ message: 'Post updated successfully!' });
        });
});

module.exports = router;