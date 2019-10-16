const express = require('express');
const moviesController = require('../controllers/movies');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.get('/', checkAuth, moviesController.getMovies);
router.post('/', checkAuth, moviesController.postMovies);
router.get('/:movieId', checkAuth, moviesController.getMovie);
// router.patch('/:movieId', moviesController.updateMovies);
// router.delete('/:movieId', moviesController.deleteMovies);

module.exports = router;
