const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Config = require("../config");

exports.create = (req, resp) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                password: hash
            });
            user.save()
                .then(() => {
                    resp.status(201).json({ message: Config.MESSAGES.USER_CREATE_SUCCESS });
                })
                .catch(error => {
                    resp.status(500).json({ error })
                });
        })
        .catch(error => resp.status(401).json({ message: error.message || Config.MESSAGES.USER_CREATE_FAILURE }));
}

exports.login = (req, resp) => {
    let user = null;
    User.findOne({ username: req.body.username })
        .then(filteredUser => {
            if (!filteredUser) {
                return resp.status(401).json({ message: Config.MESSAGES.LOGIN_AUTH });
            }
            user = filteredUser;
            return bcrypt.compare(req.body.password, filteredUser.password);
        })
        .then(isPasswordMatch => {
            if (!isPasswordMatch) {
                return resp.status(401).json({ message: Config.MESSAGES.LOGIN_AUTH });
            }
            const token = jwt.sign(
                { username: req.body.username, userId: user._id },
                process.env.JWT_KEY,
                {
                    expiresIn: Config.TOKEN_EXPIRE_TIME
                }
            );
            resp.status(200).json({
                token,
                expiresIn: Config.TOKEN_EXPIRE_TIME,
                userId: user._id,
                message: Config.MESSAGES.LOGIN_SUCCESS
            });
        })
        .catch(error => resp.status(401).json({ message: error.message || Config.MESSAGES.LOGIN_FAILURE }));
}