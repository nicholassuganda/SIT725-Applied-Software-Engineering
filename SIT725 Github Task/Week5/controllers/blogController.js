const { postComment, getAllComments } = require('../models/blogModel');

exports.getAllComments = (req, res) => {
    getAllComments((err, result) => {
        if (!err) {
            res.json({ statusCode: 200, data: result, message: 'Get All Comments Successful' });
        } else {
            res.status(500).json({ statusCode: 500, message: 'Failed to get comments' });
        }
    });
};

exports.createComment = (req, res) => {
    let comment = req.body;
    postComment(comment, (err, result) => {
        if (!err) {
            res.json({ statusCode: 201, data: result, message: 'Comment added successfully' });
        } else {
            res.status(500).json({ statusCode: 500, message: 'Failed to add comment' });
        }
    });
};
