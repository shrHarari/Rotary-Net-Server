var express = require('express');
var router = express.Router();
const { clusterController } = require('../controllers');

/* GET clusters listing. */
router.get('/', clusterController.getClustersList);
router.get('/withClubs', clusterController.getClustersListWithClubs);
router.get('/:clusterId', clusterController.getClusterById);
router.get('/withClubs/:clusterId', clusterController.getClusterByIdWithClubs);
router.get('/clusterName/:clusterName', clusterController.getClusterByClusterName);
router.post('/areaId/:areaId', clusterController.createCluster);
router.put('/:clusterId', clusterController.updateCluster);
router.delete('/:clusterId', clusterController.deleteCluster);

module.exports = router;
