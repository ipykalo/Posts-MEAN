const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post("/signup", (req, resp) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                password: hash
            });
            user.save()
                .then(result => {
                    resp.status(201).json({
                        message: 'User created',
                        result
                    });
                })
                .catch(error => {
                    resp.status(500).json({ error })
                });
        });
});

module.exports = router;