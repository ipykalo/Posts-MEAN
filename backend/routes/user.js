const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
                    resp.status(201).json({ message: 'User created' });
                })
                .catch(error => {
                    resp.status(500).json({ error })
                });
        });
});

router.post("/login", (req, resp) => {
    let user = null;
    User.findOne({ username: req.body.username })
        .then(filteredUser => {
            if (!filteredUser) {
                return resp.status(401).json({ message: 'Unauthorised' });
            }
            user = filteredUser;
            return bcrypt.compare(req.body.password, filteredUser.password);
        })
        .then(isPasswordMatch => {
            if (!isPasswordMatch) {
                return resp.status(401).json({ message: 'Unauthorised' });
            }
            const token = jwt.sign(
                { username: req.body.username, userId: user._id },
                'secret_private_key',
                {
                    expiresIn: '1h'
                }
            );
            resp.status(200).json({ token, message: 'Login successfully' });
        })
        .catch(error => resp.status(401).json({ message: error.message }))
});

module.exports = router;