var express = require('express');
var router = express.Router();
const { messageController } = require('../controllers');

/* GET Messages listing. */
router.get('/', messageController.getMessagesList);
router.get('/:messageId', messageController.getMessageById);
router.get('/:messageId/populated', messageController.getMessageByIdPopulated);
router.get('/composerId/:composerId', messageController.getMessagesListByComposerId);
router.post('/', messageController.createMessage);
router.put('/:messageId', messageController.updateMessage);
router.put('/removeMessageQueue/:messageId/personCard/:personCardId', messageController.removeMessageFromPersonCardMessageQueue);
router.put('/addMessageQueue/:messageId/personCard/:personCardId', messageController.addMessageBackToPersonCardMessageQueue);
router.delete('/:messageId', messageController.deleteMessage);

module.exports = router;
