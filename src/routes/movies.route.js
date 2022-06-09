const router = require('express').Router();

const {movieListController, movieCreateController, movieDetailController} = require('../controllers/movies.controller')
const { auth } = require('../middleware/auth');

router.get('/', auth, movieListController)
router.get('/:movieId', auth, movieDetailController)
router.post('/', auth, movieCreateController)

module.exports = router;