import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// custom CSS stylesheet
import './mystyle.css';
import './myscript.js';

import CreateMovie from "./components/create-movie.component";
import EditMovie from "./components/edit-movie.component";
import MovieLib from "./components/movie-lib.components";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          
          <nav className="navbar navbar-expand-lg navbar-light bg-light" id="myTopnav">
          
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            
              <ul className="navbar-nav mr-auto">
              <li>
                <Link to="/" className="navbar-brand">Mern-stack application</Link>
              </li>
              </ul>
            </div>
          </nav>

          <Route path="/" exact component={MovieLib} />
          <Route path="/edit/:id" component={EditMovie} />
          <Route path="/create" component={CreateMovie} />
        </div>
      </Router>
    );
  }
}

export default App;
