const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(' ')[1];
        const tokenData = jwt.verify(token, 'secret_private_key');
        req.userData = {
            username: tokenData?.username,
            userId: tokenData?.userId
        }
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
