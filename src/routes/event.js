var express = require('express');
var router = express.Router();
const { eventController } = require('../controllers');

/* GET Events listing. */
router.get('/', eventController.getEventsList);
router.get('/:eventId', eventController.getEventById);
router.get('/query/:query', eventController.getEventsListByQuery);
router.post('/', eventController.createEvent);
router.put('/:eventId', eventController.updateEvent);
router.delete('/:eventId', eventController.deleteEvent);

module.exports = router;
