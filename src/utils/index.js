const moment = require('moment');
const { Movie } = require('../models/Movie');


exports.checkMonthlyLimit = async (userId) => {
    let today = new Date();
    let startDate = moment(today).startOf('month').toDate()
    let endDate = moment(today).endOf('month').toDate();
    let movieCount =  await Movie.find({createdBy: userId, createdAt: {
        $gte: startDate,
        $lte: endDate
    }}).count()
    return movieCount >= 5;
}

exports.checkExists = async (title, userId) => {
    let movieCount =  await Movie.find({ createdBy: userId, Title: title }).count();
    return movieCount > 0;
}

exports.userMoviewCount = async (userId) => {
    /*
    @Param userId: Number  User that created the movie instance
    @Returns count: Number movies that belong to a particular user
    */
    let movieCount =  await Movie.find({ createdBy: userId }).count()
    return movieCount
}