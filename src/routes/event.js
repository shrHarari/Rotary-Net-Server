var express = require('express');
var router = express.Router();
const { eventController } = require('../controllers');

/* GET Events listing. */
router.get('/', eventController.getEventsList);
router.get('/:eventId', eventController.getEventById);
router.get('/:eventId/populated', eventController.getEventByIdPopulated);
router.get('/query/:query', eventController.getEventsListByQuery);
router.get('/query/:query/populated', eventController.getEventsListByQueryPopulated);

router.post('/', eventController.createEvent);

router.put('/:eventId', eventController.updateEvent);
router.put('/:eventId/updateEventImage', eventController.updateEventImage);

router.delete('/:eventId', eventController.deleteEvent);

module.exports = router;
