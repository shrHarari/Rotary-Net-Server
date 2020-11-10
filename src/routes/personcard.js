var express = require('express');
var router = express.Router();
const { personCardController } = require('../controllers');

/* GET PersonCards listing. */
router.get('/', personCardController.getPersonCardsList);
router.get('/populated', personCardController.getPersonCardsListPopulated);
router.get('/personCardId/:personCardId', personCardController.getPersonCardById);
router.get('/personCardId/:personCardId/populated', personCardController.getPersonCardByIdPopulated);
router.get('/personCardId/:personCardId/message_populated', personCardController.getPersonCardByIdMessagePopulated);
router.get('/personCardId/:personCardId/all_populated', personCardController.getPersonCardByIdAllPopulated);
router.get('/firstName/:firstName/lastName/:lastName', personCardController.getPersonCardsListByName);
router.get('/firstName/:firstName/lastName/:lastName/populated', personCardController.getPersonCardsListByNamePopulated);
router.get('/query/:query', personCardController.getPersonCardsListByQuery);
router.get('/query/:query/populated', personCardController.getPersonCardsListByQueryPopulated);

router.get('/roleHierarchyByAll', personCardController.getPersonCardsListByRoleHierarchyAll);
router.get('/roleHierarchyByAreaId/:areaId', personCardController.getPersonCardsListByRoleHierarchyAreaId);
router.get('/roleHierarchyByClusterId/:clusterId', personCardController.getPersonCardsListByRoleHierarchyClusterId);
router.get('/roleHierarchyByClubId/:clubId', personCardController.getPersonCardsListByRoleHierarchyClubId);

router.post('/userId/:userId', personCardController.createPersonCard);
router.put('/:personCardId', personCardController.updatePersonCard);
router.delete('/:personCardId', personCardController.deletePersonCard);

module.exports = router;
