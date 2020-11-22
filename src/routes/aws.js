var express = require('express');

var router = express.Router();
const { awsController } = require('../controllers');

/* GET AWS listing. */
router.post('/generatePreSignedUrl', awsController.generatePreSignedUrl);

router.post('/deleteFile', awsController.deleteFile);


module.exports = router;
