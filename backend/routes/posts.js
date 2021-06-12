const express = require('express');
const multer = require('multer');
const router = express.Router();
const checkToken = require('../middleware/check-token');
const PostsController = require("../controllers/posts");

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

router.post("", checkToken, multer({ storage }).single("image"), PostsController.create);

router.get('', checkToken, PostsController.fetchAll);

router.get("/:id", checkToken, PostsController.fetchOne);

router.delete("/:id", checkToken, PostsController.delete);

router.put("/:id", checkToken, multer({ storage }).single("image"), PostsController.update);

module.exports = router;