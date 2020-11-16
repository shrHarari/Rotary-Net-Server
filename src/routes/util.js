var express = require('express');
var multer  = require('multer');

var router = express.Router();
const { utilController } = require('../controllers');

var uploadPersoncardImage = multer({ dest: 'PersonCardImages/' });

/* GET utils listing. */
router.get('/checkdb', utilController.checkDb);



var cpUpload = uploadPersoncardImage.fields([{ name: 'personCardImage', maxCount: 1 }, { name: 'image', maxCount: 1 }])
router.post('/uploadPersonCardImage', cpUpload, utilController.uploadPersoncardImage);
// router.post('/uploadPersonCardImage', uploadPersoncardImage.single("picture"), utilController.uploadPersoncardImage);


/// AWS Section:
///==================
router.get('/sign-s3/fileName/:fileName/fileType/:fileType', utilController.signS3);
router.post('/uploadAwsPersonCardImage', cpUpload, utilController.uploadAwsPersoncardImage);


router.delete('/deletePersonCardImage/:personCardImageFile', utilController.deletePersoncardImage);
router.get('/:personCardImageFile', utilController.getPersoncardImageFile);

module.exports = router;
