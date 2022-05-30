require('dotenv').config();

const app = require('./app')
const {connectDB} = require('./database')

const movieRoutes = require('./routes/movies.route')

const { PORT } = process.env || 5500;
// const { DATABASE_URL } = process.env


connectDB()
.then(() => {
    app.listen(PORT, ()=> {
        console.log(`App running at http://localhost:${PORT}`);
    });
})
.catch(err => console.error(err));



