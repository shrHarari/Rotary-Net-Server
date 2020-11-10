var express = require('express');
var router = express.Router();
const { roleController } = require('../controllers');

/* GET roles listing. */
router.get('/', roleController.getRolesList);
router.get('/:roleId', roleController.getRoleById);
router.get('/roleEnum/:roleEnum', roleController.getRoleByEnum);
router.get('/roleName/:roleName', roleController.getRoleByRoleName);
router.post('/', roleController.createRole);
router.put('/:roleId', roleController.updateRole);
router.delete('/:roleId', roleController.deleteRole);

module.exports = router;
