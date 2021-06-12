const Post = require('../models/post');

exports.create = (req, res) => {
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
        })
        .catch(error => resp.status(500).json({ message: error.message || 'Creating a post failed!' }));
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
                message: 'Posts fetched successfully!',
                posts: fetchedPosts,
                totalPosts: count
            });
        })
        .catch(error => resp.status(500).json({ message: error.message || 'Fetching posts failed!' }));
}

exports.fetchOne = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (post) {
                res.status(200).json(post);
                return;
            }
            res.status(404).json({ message: 'Post not feund!' })
        })
        .catch(error => resp.status(500).json({ message: error.message || 'Fetching the post failed!' }));
}

exports.delete = (req, res) => {
    Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
        .then(result => {
            if (result?.n === 0) {
                res.status(401).json({ message: 'Only the creator can delete the Post!' });
                return;
            }
            res.status(200).json({ message: 'Post deleted successfully!' });
        })
        .catch(error => resp.status(500).json({ message: error.message || 'Deleting the post failed!' }));
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
                res.status(401).json({ message: 'Only the creator can modify the Post!' });
                return;
            }
            res.status(200).json({ message: 'Post updated successfully!' });
        })
        .catch(error => resp.status(500).json({ message: error.message || 'Updating a post failed!' }));
}