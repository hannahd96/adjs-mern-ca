import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateMovie from "./components/create-movie.component";
import EditMovie from "./components/edit-movie.component";
import MovieLib from "./components/movie-lib.components";

import logo from "./movieLogo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <img src={logo} width="30" height="30" alt="movie-logo" />
          
            <Link to="/" className="navbar-brand">MERN-STACK Movie App</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Movies</Link>
                </li>
                <li className="nav-item">
                  <Link to="/create" className="nav-link">Create Movie</Link>
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
