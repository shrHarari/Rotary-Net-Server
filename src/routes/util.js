var express = require('express');
var multer  = require('multer');

var router = express.Router();
const { utilController } = require('../controllers');

var uploadPersoncardImage = multer({ dest: 'PersonCardImages/' });

/* GET utils listing. */
var cpUpload = uploadPersoncardImage.fields([{ name: 'personCardImage', maxCount: 1 }, { name: 'image', maxCount: 1 }])
router.post('/uploadPersonCardImage', cpUpload, utilController.uploadPersoncardImage);
// router.post('/uploadPersonCardImage', uploadPersoncardImage.single("picture"), utilController.uploadPersoncardImage);

router.delete('/deletePersonCardImage/:personCardImageFile', utilController.deletePersoncardImage);
router.get('/:personCardImageFile', utilController.getPersoncardImageFile);

module.exports = router;
