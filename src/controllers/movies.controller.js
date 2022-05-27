const { Movie } = require('../models/Movie')

exports.movieList = (req, res) => {
    return res.json({message: 'Movie List'});
}

exports.movieCreate = (req, res) => {
    
}