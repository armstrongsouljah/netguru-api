const router = require('express').Router();

const {movieListController, movieCreateController} = require('../controllers/movies.controller')
const { auth } = require('../middleware/auth');

router.get('/', auth, movieListController)
router.post('/', auth, movieCreateController)

module.exports = router;