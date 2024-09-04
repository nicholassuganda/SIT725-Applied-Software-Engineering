const express = require('express');
const router = express.Router();
const commentController = require('../controllers/blogController');

router.get('/api/comments', commentController.getAllComments);
router.post('/api/comment', commentController.createComment);

module.exports = router;
