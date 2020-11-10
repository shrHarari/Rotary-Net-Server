var express = require('express');
var router = express.Router();
const { areaController } = require('../controllers');

/* GET areas listing. */
router.get('/', areaController.getAreasList);
router.get('/withClusters', areaController.getAreasListWithClusters);
router.get('/:areaId', areaController.getAreaById);
router.get('/withClusters/:areaId', areaController.getAreaByIdWithClusters);
router.get('/areaName/:areaName', areaController.getAreaByAreaName);
router.post('/', areaController.createArea);
router.put('/:areaId', areaController.updateArea);
router.delete('/:areaId', areaController.deleteArea);

module.exports = router;
