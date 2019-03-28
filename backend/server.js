const express = require('express');
// creating new instance of express
const app = express();
// gives access to bodyParser middleware
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const movieRoutes = express.Router();
const PORT = 4000;

let Movie = require('./movie.model');

// Middleware
// passing instance of cors
app.use(cors());

// json method called from bodyParser instance
app.use(bodyParser.json());

// used to connect to mongodb database
// mongodb listening on port 27017/table name is movies
mongoose.connect('mongodb://127.0.0.1:27017/movies', { useNewUrlParser: true });
// retrieve ref to connection object
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

// bring in 1st endpoint
movieRoutes.route('/').get(function(req, res){
    // retrieve items from db using data model
    Movie.find(function(err, movies){
        // if there are any errors, 
        // output it to the console
        if (err) {
            console.log(err);
        } else {
        // attaching what we get from the db to the response object
            res.json(movies);
        }
    });
});


// route needs to accept a param, which is the id
// use get to accept http requests and will be handled by a callback function
movieRoutes.route('/:id').get(function(req, res){
    let id = req.params.id;
    Movie.findById(id, function(err, movie){
        res.json(movie);
    });
});

movieRoutes.route('/add').post(function(req, res){
    let movie = new Movie(req.body);
    movie.save()
        .then(movie => {
            res.status(200).json({'movie': 'movie added successfuly'});
        })
        .catch(err=>{
            res.status(400).send('adding new movie failed');
        });
});

movieRoutes.route('/update/:id').post(function(req, res) {
    Movie.findById(req.params.id, function(err, movie) {
        if (!movie)
            res.status(404).send('data is not found');
        else
            movie.movie_title = req.body.movie_title;
            movie.movie_year = req.body.movie_year;
            movie.movie_genre = req.body.movie_genre;

            movie.save().then(movie => {
                res.json('Movie Updated!');
            })
            .catch(err =>{
                res.status(400).send("Update not possible");
            });

    });
});

// inserting router (a middleware being used)
app.use('/movies', movieRoutes);

// callback function is executed when the server has started successfully
app.listen(PORT, function(){
    // listening for requests on Port 4000
    // output msg below when server has started
    console.log("Server is running on Port: " + PORT);
});