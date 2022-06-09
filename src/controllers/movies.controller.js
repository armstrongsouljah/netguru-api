const fetch = require('node-fetch');

const { Movie } = require('../models/Movie');
const { checkMonthlyLimit, checkExists, userMoviewCount, STATUS_CODES } = require('../utils/index');
const { MOVIES_URL, API_KEY } = process.env
const {HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_OK, HTTP_NOT_FOUND} = STATUS_CODES;


const getMovieByTitle = async (title) => {
    const fetchUrl = encodeURI(`${MOVIES_URL}?apikey=${API_KEY}&t=${title}`)
    let response = await fetch(fetchUrl)
      .then(res => res.json())
      .then(data => data)
      .catch(err => err)
    return response
}

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
                       
    return res.status(HTTP_OK).json({ 
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

   // limit basic account to 5 movies/month
   
    let hasExceededLimit = await checkMonthlyLimit(userId, role);
    if(hasExceededLimit) {
        return res.status(HTTP_BAD_REQUEST).json({
            error: 'Basic accounts can only create 5 movies monthly'
        })
    }

   //  get more details About the movie
   if(!title) {
    return res.status(HTTP_BAD_REQUEST).json({
        error: 'Please provide a movie title'
        })
    }

    let resData = await getMovieByTitle(title);
    if(resData.Error) {
        return res.status(HTTP_BAD_REQUEST).json({ error: resData.Error})
    }

    let { Title, Released, Genre, Director } = resData;
    if (Released == 'N/A') Released = new Date(resData.Year);

    const movieExists = await checkExists(Title, userId)
    if (movieExists) {
        return res.status(HTTP_BAD_REQUEST).json({ error: "You have already saved this movie" })
    }
    let movie = await Movie.create({
        Title, Released,
        Genre, Director,
        createdBy: userId});

    return res.status(HTTP_CREATED).json({
        message: "Movie created succeessfully",
        movie
    })
}

exports.movieDetailController = async (req, res) => {
    /*
     Params: movieID
     @Returns: Mongodb Document or empty object
    */
   const {movieID} = req.params;
   const {userId} = req.user;
   let movie = await Movie.objects.find({_id: movieID, createdBy: userId})
   if (movie) {
       return res.status(HTTP_OK).json({data: movie})
   }
   return res.status(HTTP_NOT_FOUND).json({
       error: "Movie with this could not be found"
   })
}