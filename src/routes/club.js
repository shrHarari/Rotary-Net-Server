var express = require('express');
var router = express.Router();
const { clubController } = require('../controllers');

/* GET clubs listing. */
router.get('/', clubController.getClubsList);
router.get('/:clubId', clubController.getClubById);
router.get('/clubName/:clubName', clubController.getClubByClubName);
router.post('/clusterId/:clusterId', clubController.createClub);
router.put('/:clubId', clubController.updateClub);
router.delete('/:clubId', clubController.deleteClub);

module.exports = router;
