const jwt = require('jsonwebtoken');
const Config = require("../config");

module.exports = (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(' ')[1];
        const tokenData = jwt.verify(token, process.env.JWT_KEY);
        req.userData = {
            username: tokenData?.username,
            userId: tokenData?.userId
        }
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
