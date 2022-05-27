const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    released: Date,
    genre: String,
    director: String
})

exports.Movie = mongoose.model('Movie', movieSchema, 'movies');
