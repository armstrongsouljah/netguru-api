require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const movieRoutes = require('./routes/movies.route')

const { PORT } = process.env || 5500;


app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/movies', movieRoutes)


module.exports = app;
