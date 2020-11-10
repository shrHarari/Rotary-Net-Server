var express = require('express');
var router = express.Router();
const { menuPageController } = require('../controllers');

/* GET menuPages listing. */
router.get('/', menuPageController.getPageItemsList);
router.get('/:pageName', menuPageController.getPageItemsListByPageName);

module.exports = router;
