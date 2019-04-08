import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class EditMovie extends Component {
    
    constructor(props) {
        super(props);


        // binding this to the change methods
        this.onChangeMovieTitle = this.onChangeMovieTitle.bind(this);
        this.onChangeMovieYear = this.onChangeMovieYear.bind(this);
        this.onChangeMovieGenre = this.onChangeMovieGenre.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state ={
            movie_title: '',
            movie_year: '',
            movie_genre: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/movies/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    movie_title: response.data.movie_title,
                    movie_genre: response.data.movie_genre,
                    movie_year: response.data.movie_year
                })
            })
            // invoking a function in case of any errors
            .catch(function(error){
                console.log(error)
            })
    }  
    
    // pass event as a parameter
    onChangeMovieTitle(e) {
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

    // send updated movie object available in component state
    // makes sure mongo db is updated with new values
    onSubmit(e){
        e.preventDefault();
        const obj = {
            movie_title: this.state.movie_title,
            movie_year: this.state.movie_year,
            movie_genre: this.state.movie_genre
        };
        // locahost:4000 is where the backend is running
        // include object which contains updated information
        axios.post('http://localhost:4000/movies/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
            // returns user to default route after they submit
            this.props.history.push('/');
    }

    render() {
        return (
            <div className="container" style={{ marginTop:100 }}>
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        {/* jsx form allowing users to edit existing values */}
                <h3>Update Movie</h3>
               <br></br>
               {/* form element uses on submit to assign eventhandler for onsubmit event */}
               {/* a request (with new values) will be sent out to backend */}

               <form onSubmit={this.onSubmit}>
                   <div className="form-group">
                       <label>Title: </label>
                       {/* the state of the component will be updated with the values */}
                       <input  type="text" 
                               className="form-control" 
                               value={this.state.movie_title}
                               onChange={this.onChangeMovieTitle}>
                       </input>    
                   </div>
                   <div className="form-group">
                       <label>Year: </label>
                       <input  type="text" 
                               className="form-control" 
                               value={this.state.movie_year}
                               onChange={this.onChangeMovieYear}>
                       </input>    
                   </div>
                   <div className="form-group">
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
                           <br></br><br></br>
                           <div className="form-group">
                           <Link to="/" className="btn btn-warning" id="cancel_btn">Cancel</Link>
                               <input type="submit" value="Update Movie" className="btn btn-primary">
                               </input>
                           </div>
                   </div>
               </form> 
                    </div>
                </div>
                
            </div>
        )
    }
} 