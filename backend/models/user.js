const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchame = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchame.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchame);