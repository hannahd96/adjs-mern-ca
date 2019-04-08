import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class CreateMovie extends Component {

constructor(props){
    super(props);

    // bind to this object
    this.onChangeMovieTitle = this.onChangeMovieTitle.bind(this);
    this.onChangeMovieYear = this.onChangeMovieYear.bind(this);
    this.onChangeMovieGenre = this.onChangeMovieGenre.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // specifying the properties for a movie item
    this.state = {
        // state is set to these components
        movie_title: '',
        movie_year: '',
        movie_genre: ''
    }
}

// updating property from local state
    onChangeMovieTitle(e){
        this.setState({
            movie_title: e.target.value
        });
    }

    onChangeMovieYear(e){
        this.setState({
            movie_year: e.target.value
        });
    }

    onChangeMovieGenre(e){
        this.setState({
            movie_genre: e.target.value
        });
    }


    // handling submit event
    onSubmit(e){
        // call this to get rid of default behavior
        e.preventDefault();

        console.log(`form submitted`);
        console.log(`movie title: ${this.state.movie_title}`);
        console.log(`movie genre: ${this.state.movie_genre}`);
        console.log(`movie year: ${this.state.movie_year}`);

        // create new movie object
        // uses values entered by the user in the form
        const newMovie = {
            movie_title: this.state.movie_title,
            movie_year: this.state.movie_year,
            movie_genre: this.state.movie_genre
        }
        // make axios call (calls post method from axios library)
        // pass in string containing URL of endpoint of backend server
        // that endpoint accepts incoming POST requests which contain data of a new movie oject
        axios.post('/add', newMovie)
            // attach a 'then' call which is activated once the response arrives
            // recieves argument which is res (response object)
            .then(res => console.log(res.data));
            // returns user to default route after they submit
            this.props.history.push('/');
            

        // set state once form is submitted
        this.setState({
            movie_title: '',
            movie_genre: '',
            movie_year:'',
        })
    }


    render() {
        return (
            <div className="container"  style={{marginTop:100}}>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                    <h3 className="movie-header">Create Movie</h3>
                    
                    <br>
                    </br>
                {/* binding onsubmit event from the form to be handled 
                by the onsubmit method of the component*/}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input  type="text" 
                                className="form-control" 
                                value={this.state.movie_title} 
                                onChange={this.onChangeMovieTitle} 
                                />
                    </div>
                    <div className="form-group">
                        <label>Year: </label>
                        <input  type="text" 
                                className="form-control" 
                                value={this.state.movie_year}
                                onChange={this.onChangeMovieYear} 
                                />
                    </div>
                    <div className="form-group">
                    <label>Movie Genre:</label><br></br>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="genreButtons" 
                                    id="genreHorror" 
                                    value="Horror" 
                                    checked={this.state.movie_genre==='Horror'} 
                                    onChange={this.onChangeMovieGenre}
                                    />
                            <label className="form-check-label">Horror</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="genreButtons" 
                                    id="genreComedy" 
                                    value="Comedy" 
                                    checked={this.state.movie_genre==='Comedy'} 
                                    onChange={this.onChangeMovieGenre}
                                    />
                            <label className="form-check-label">Comedy</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="genreButtons" 
                                    id="genreRomance" 
                                    value="Romance" 
                                    checked={this.state.movie_genre==='Romance'} 
                                    onChange={this.onChangeMovieGenre}
                                    />
                            <label className="form-check-label">Romance</label>
                        </div>
                    </div>
                    <br></br>
                        <div className="form-group">
                            <Link to="/" className="btn btn-warning" id="cancel_btn">Cancel</Link>
                            <input type="submit" value="Submit" className="btn btn-primary" />
                        </div>
                     </form>
                     
                        

                    </div>
                </div>
            </div>
        )
    }
} 