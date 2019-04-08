import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import pen from './pencil.png';
import bin from './bin.png';

// containing jsx code being returned
const Movie = props => (
    <tr>
        {/* props.movie is getting passed in */}
        <td className={props.movie.movie_title ? 'completed' : ''}>{props.movie.movie_title}</td>
        <td className={props.movie.movie_year ? 'completed' : ''}>{props.movie.movie_year}</td>
        <td className={props.movie.movie_genre ? 'completed' : ''}>{props.movie.movie_genre}</td>
        <td>
            {/* link to movie to edit */}
            <Link to={"/edit/" + props.movie._id} id="edit_link">
            {/* <i className="glyphicon glyphicon-pencil"></i> */}'
            <img src={pen} alt="pen" id="edit_icon"></img>
            </Link>

              {/* link to movie to edit */}
              <Link to={''} id="delete_link">
            {/* <i className="glyphicon glyphicon-pencil"></i> */}'
            <img src={bin} alt="delete" id="delete_icon"></img>
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
        axios.get('/')
        // callback function
            .then(response => {
                // set it to data being deliveiverd with response object
                this.setState({movies: response.data});
            }) 
            .catch(function(error){
                console.log(error);
            })
    }
// http://localhost:4000/movies/

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
            <div className="container" style={{marginTop:80}}>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                       <h3>Movies<Link to="/create" className="btn btn-success" id="create_btn">Create Movie</Link></h3>
                    </div>
                </div>
                <div className="row justify-content-center">
                <div className="col-md-8">
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
            </div>
        )
    }
} 