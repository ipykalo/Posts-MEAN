const express = require("express");
const router = express.Router();
const PostsController = require("../controllers/posts");

const checkToken = require("../middleware/check-token");
const extractFile = require("../middleware/file");

router.post("", checkToken, extractFile, PostsController.create);

router.get('', checkToken, PostsController.fetchAll);

router.get("/:id", checkToken, PostsController.fetchOne);

router.delete("/:id", checkToken, PostsController.delete);

router.put("/:id", checkToken, extractFile, PostsController.update);

module.exports = router;