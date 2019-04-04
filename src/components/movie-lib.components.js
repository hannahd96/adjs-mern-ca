import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// containign jsx code being returned
const Movie = props => (
    <tr>
        {/* props.movie is getting passed in */}
        <td className={props.movie.movie_title ? 'completed' : ''}>{props.movie.movie_title}</td>
        <td className={props.movie.movie_year ? 'completed' : ''}>{props.movie.movie_year}</td>
        <td className={props.movie.movie_genre ? 'completed' : ''}>{props.movie.movie_genre}</td>
        <td>
            {/* link to movie to edit */}
            <Link to={"/edit/" + props.movie._id}>
                Edit
            </Link>
        </td>
    </tr>
)

export default class MovieLib extends Component {

    // set initial state object to contain a property of movie
    constructor(props){
        // calling parent constructor and passing in props
        super(props);
        // assigining empty array
        this.state = {movies: []};
    }

    // initialise movie state property with movies in the db
    // request backend and retrieve list of movies
    componentDidMount(){
        // initliase http get request
        axios.get('http://localhost:4000/movies/')
        // callback function
            .then(response => {
                // set it to data beging deliveiverd with respone object
                this.setState({movies: response.data});
            }) 
            .catch(function(error){
                console.log(error);
            })
    }

    componentDidUpdate(){
         axios.get('http://localhost:4000/movies/')
            .then(response => {
                this.setState({movies: response.data});
             }) 
             .catch(function(error){
                 console.log(error);
             })
    }



    movieList() {
        // used to iterate over the elements in movies array
        // i = index
        return this.state.movies.map(function(currentMovie, i) {
            // component that is getting passed into a prop named movie
            return <Movie movie={currentMovie} key={i}></Movie>;
        });
    }

    // returns jsx code
    // JSX = XML/HTML-like syntax used by React that extends ECMAScript
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                <h2>Movie List</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Year</th>
                            <th>Genre</th>
                            {/* allows user to interact with items */}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* needed to output list of movies */}
                        { this.movieList() }
                    </tbody>
                </table>
                </div>
              
            </div>
        )
    }
} 