// define mongoose schema by bringing in library
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Movie = new Schema({
    movie_title: {
        type: String
    },
    movie_genre:{
        type: String
    },
    movie_year:{
        type: String
    }
});

module.exports = mongoose.model('Movie', Movie);

