const {movieList, movieCreate} = require('../controllers/movies.controller')
const router = require('express').Router();


router.get('/', movieList)
router.post('/', movieCreate)
module.exports = router;