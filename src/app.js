require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const movieRoutes = require('./routes/movies.route')

const { PORT } = process.env || 5500;
const { DATABASE_URL } = process.env

app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/movies', movieRoutes)

mongoose.connect(DATABASE_URL)
        .then(() => {
            app.listen(PORT, ()=> {
                console.log(`App running at http://localhost:${PORT}`);
             });
        })
        .catch(err => console.error(err))

exports.app = app;
