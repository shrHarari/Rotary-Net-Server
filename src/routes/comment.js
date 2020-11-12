var express = require('express');

var router = express.Router();
const { commentController } = require('../controllers');

/* GET comments listing. */
router.get('/', commentController.getCommentsList);

module.exports = router;
