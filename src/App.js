import React, { Component } from 'react';
import { MoviePage } from './MoviePage';
import { moviesOverview } from './api';
import './App.css';

export class App extends Component {
  state = {
    currentId: null,
    showDetail: false,
  };

  handleMovieClick = (id) => {
    this.setState({
      currentId: id,
      showDetail: true,
    });
  };

  handleBackClick = () => {
    this.setState({
      currentId: null,
      showDetail: false,
    });
  };

  render() {
    const { currentId, showDetail } = this.state;

    return (
      <div>{showDetail ? this.renderDetail(currentId) : this.renderList()}</div>
    );
  }

  renderDetail(id) {
    return (
      <div>
        <button className="onBack" onClick={this.handleBackClick}>
          {'👈'}
        </button>
        <MoviePage id={id} />
      </div>
    );
  }

  renderList() {
    return (
      <div>
        <h1>Top Box Office {'🍿'}</h1>
        <div>
          {moviesOverview.map((movie) => (
            <div
              className="movie"
              key={movie.id}
              onClick={() => this.handleMovieClick(movie.id)}
            >
              <div className="rating">{movie.rating > 70 ? '🍅' : '🤢'}</div>
              <div className="main">
                <div className="title">{movie.title}</div>
                <div className="info">
                  {movie.rating}% · {movie.gross}
                </div>
              </div>
              <div className="hover">{'👉'}</div>
              <div className="loading">{'🌀'}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
