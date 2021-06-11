const express = require('express');
const multer = require('multer');

const Post = require('../models/post');
const checkToken = require('../middleware/check-token');

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

router.post("", checkToken, multer({ storage }).single("image"), (req, res) => {
    const url = `${req.protocol}://${req.get('host')}`
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        path: `${url}/images/${req.file.filename}`,
        creator: req.userData.userId
    });
    post.save()
        .then(() => {
            res.status(201).json({ message: 'Post added successfully!' });
        });
});

router.get('', checkToken, (req, res) => {
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
            return Post.countDocuments();
        })
        .then(count => {
            res.status(200).json({
                message: 'Posts fetched successfully!',
                posts: fetchedPosts,
                totalPosts: count
            });
        });
});

router.get("/:id", checkToken, (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (post) {
                res.status(200).json(post);
                return;
            }
            res.status(404).json({ message: 'Post not feund!' })
        });
});

router.delete("/:id", checkToken, (req, res) => {
    Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
        .then(result => {
            if (result?.n === 0) {
                res.status(401).json({ message: 'Only the creator can delete the Post!' });
                return;
            }
            res.status(200).json({ message: 'Post deleted successfully!' });
        });
});

router.put("/:id", checkToken, multer({ storage }).single("image"), (req, res) => {
    const url = `${req.protocol}://${req.get('host')}`
    const post = new Post({
        _id: req.body?._id,
        title: req.body?.title,
        content: req.body?.content,
        path: req.file?.filename ? `${url}/images/${req.file.filename}` : req.file?.path
    });
    Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
        .then(result => {
            if (result?.n === 0) {
                res.status(401).json({ message: 'Only the creator can modify the Post!' });
                return;
            }
            res.status(200).json({ message: 'Post updated successfully!' });
        });
});

module.exports = router;