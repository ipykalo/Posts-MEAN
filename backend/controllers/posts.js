const Post = require("../models/post");
const Config = require("../config")

exports.create = (req, res) => {
    const url = `${req.protocol}://${req.get('host')}`
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        path: `${url}/images/${req.file.filename}`,
        creator: req.userData.userId
    });
    post.save()
        .then(() => res.status(201).json({ message: Config.MESSAGES.CREATE_POST_SUCCESS }))
        .catch(err => resp.status(500).json({ message: err.message || Config.MESSAGES.CREATE_POST_FAILURE }));
}

exports.fetchAll = (req, res) => {
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
                message: Config.MESSAGES.FETCH_POSTS_SUCCESS,
                posts: fetchedPosts,
                totalPosts: count
            });
        })
        .catch(error => resp.status(500).json({ message: error.message || Config.MESSAGES.FETCH_POSTS_FAILURE }));
}

exports.fetchOne = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (post) {
                return res.status(200).json(post);
            }
            res.status(404).json({ message: Config.MESSAGES.FETCH_POST_FAILURE })
        })
        .catch(error => resp.status(500).json({ message: error.message || Config.MESSAGES.FETCH_POST_FAILURE }));
}

exports.delete = (req, res) => {
    Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
        .then(result => {
            if (result?.n === 0) {
                return res.status(401).json({ message: Config.MESSAGES.DELTE_POST_AUTH });
            }
            res.status(200).json({ message: Config.MESSAGES.DELTE_POST_SUCCESS });
        })
        .catch(error => resp.status(500).json({ message: error.message || Config.MESSAGES.DELTE_POST_FAILURE }));
}

exports.update = (req, res) => {
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
                return res.status(401).json({ message: Config.MESSAGES.UPDATE_POST_AUTH });
            }
            res.status(200).json({ message: Config.MESSAGES.UPDATE_POST_SUCCESS });
        })
        .catch(error => resp.status(500).json({ message: error.message || Config.MESSAGES.UPDATE_POST_FAILURE }));
}