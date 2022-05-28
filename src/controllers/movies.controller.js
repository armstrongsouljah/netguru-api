const fetch = require('node-fetch');

const { Movie } = require('../models/Movie');
const { checkMonthlyLimit, checkExists, userMoviewCount } = require('../utils/index');
const { MOVIES_URL, API_KEY } = process.env

exports.movieListController = async (req, res) => {
    /*
      @Returns: movies:<Array>
      Authentication: 
    */
    const {userId} = req.user;
    const { page=1, limit=10 } =req.query;
    let movies = await Movie.find({createdBy: userId})
                       .limit(limit *1)
                       .skip((page-1) * limit)
                       .exec();
    let count = await userMoviewCount(userId);
    let totalPages = Math.ceil(count/limit)
                       
    return res.json({ 
                    movies,
                    totalPages,
                    currentPage: page
        });
}

exports.movieCreateController = async (req, res) => {
    /*
      Resource for creating and saving movie instances into the database
      @Body, title: Movie title
      @Returns, created movie objects
      @Raises, Error
    */

   const { title } = req.body;
   const {userId, role } = req.user;
   const fetchUrl = encodeURI(`${MOVIES_URL}?apikey=${API_KEY}&t=${title}`)
   
   if(!title) {
       return res.status(400).json({
           error: 'Please provide a movie tite'
       })
   }

   if(role == 'basic') {
        let hasExceededLimit = await checkMonthlyLimit(userId);
        if(hasExceededLimit) {
            return res.status(400).json({
                error: 'Basic accounts can only create 5 movies monthly'
            })
        }
    }
   //  get more details About the movie  
   let resData = await fetch(fetchUrl)
      .then(res => res.json())
      .then(data => data)
      .catch(err => console.error(err))

    if(!resData.Error) {
        let { Title, Released, Genre, Director } = resData;
        if (Released == 'N/A') Released = new Date(resData.Year);

        const movieExists = await checkExists(Title, userId)
        if (movieExists) {
            return res.status(400).json({ error: "You have already saved this movie" })
        }
        let movie = await Movie.create({
            Title,
            Released,
            Genre,
            Director,
            createdBy: userId})
            return res.json({
                message: "Movie created succeessfully",
                movie
        })
        
    } else {
        res.status(400).json({ error: resData.Error})
    }  
}