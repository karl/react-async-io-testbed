import React, { Component } from 'react';
import { MoviePage } from './MoviePage';
import { moviesOverview, fetchMovieDetails } from './api';
import { Placeholder } from './placeholder';
import { Spinner } from './spinner';
import { delay } from './delay';

export class App extends Component {
  state = {
    currentId: null,
    showDetail: false,
    isLoading: false,
    details: null,
  };

  handleMovieClick = (id) => {
    this.setState({
      currentId: id,
      isLoading: true,
    });

    delay(1500).then(() => {
      if (this.state.currentId !== id) {
        return;
      }

      this.setState({
        showDetail: true,
      });
    });

    fetchMovieDetails(id).then((details) => {
      if (this.state.currentId !== id) {
        return;
      }

      this.setState({
        isLoading: false,
        details,
      });
    });
  };

  handleBackClick = () => {
    this.setState({
      currentId: null,
      showDetail: false,
      details: null,
    });
  };

  render() {
    const { currentId, showDetail, details, isLoading } = this.state;

    return (
      <div>
        {showDetail
          ? this.renderDetail(currentId, details, isLoading)
          : this.renderList()}
      </div>
    );
  }

  renderDetail(id, details, isLoading) {
    return (
      <div>
        <button className="onBack" onClick={this.handleBackClick}>
          {'👈'}
        </button>
        <Placeholder isLoading={isLoading} fallback={<Spinner size="large" />}>
          <MoviePage id={id} details={details} />
        </Placeholder>
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
