const multer = require('multer');
const Config = require("../config");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let error = Config.MIME_TYPE_MAP[file.mimetype] ? null : new Error('Invalid mime type');
        cb(error, './images');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
        const ext = Config.MIME_TYPE_MAP[file.mimetype];
        cb(null, `${name}-${Date.now()}.${ext}`);
    }
});

module.exports = multer({ storage }).single("image");