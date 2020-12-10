var express = require('express');
var router = express.Router();
const { heroController } = require('../controllers');

router.get('/heroes', heroController.getHeroes);
router.get('/heroId/:heroId', heroController.getHeroById);
router.get('/query/:query', heroController.getHeroesListByQuery);

router.post('/heroId/:heroId', heroController.createHero);

router.put('/heroId/:heroId', heroController.updateHero);

router.delete('/:heroId', heroController.deleteHero);

module.exports = router;
