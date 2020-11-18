var express = require('express');

var router = express.Router();
const { awsController } = require('../controllers');

/* GET AWS listing. */
router.post('/generatePreSignedUrl', awsController.generatePreSignedUrl);


module.exports = router;
