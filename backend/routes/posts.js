const { Router } = require('express');
const express = require('express');
const { request } = require('http');

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");
const PostController = require('../controllers/post');
const router = express.Router();



router.post("",
          checkAuth,
          extractFile,
          PostController.createPost);

router.put(
  "/:id",
  checkAuth,
  extractFile,
  PostController.updatePost
);

router.get('/:id',
          PostController.getPostById);

router.get('',
          PostController.getPosts);

router.delete('/:id',
              checkAuth,
              PostController.deletePost
              );

module.exports = router;
