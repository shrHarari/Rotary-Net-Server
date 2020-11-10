var express = require('express');
var router = express.Router();
const { userController } = require('../controllers');

/* GET Users listing. */
router.get('/', userController.getUsersList);
router.get('/:userId', userController.getUserById);
router.get('/email/:email', userController.getUserByEmail);
router.get('/firstName/:firstName/lastName/:lastName', userController.getUsersListByName);
router.get('/query/:query', userController.getUsersListByQuery);
router.post('/', userController.createUser);
router.post('/login', userController.confirmUserByEmailAndPassword);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;
