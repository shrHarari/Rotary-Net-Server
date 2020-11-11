var express = require('express');
var router = express.Router();
const { menuPageController } = require('../controllers');

/* GET menuPages listing. */
router.get('/:pageName', menuPageController.getPageItemsListByPageName);

module.exports = router;
