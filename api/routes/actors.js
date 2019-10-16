const express = require('express');
const actorsController = require('../controllers/actors');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/', actorsController.getActors);
router.post('/', checkAuth, actorsController.postActors);
router.get('/:actorId', actorsController.getActor);
router.patch('/:actorId', checkAuth, actorsController.updateActors);
router.delete('/:actorId', checkAuth, actorsController.deleteActors);

module.exports = router;
