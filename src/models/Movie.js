const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    Title: String,
    Released: Date,
    Genre: String,
    Director: String,
    createdBy: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

exports.Movie = mongoose.model('Movie', movieSchema, 'movies');
