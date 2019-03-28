import React, {Component} from 'react';

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

        // set state once form is submitted
        this.setState({
            movie_title: '',
            movie_genre: '',
            movie_year:'',
        })
    }


    render() {
        return (
            <div style={{marginTop: 20}}>
                <h2>Create New Movie Object</h2>
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
                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
} 