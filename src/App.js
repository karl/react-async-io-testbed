import React, { Component } from 'react';
import { fetchMovieDetails, fetchMovieReviews } from './api';
import { MovieListPage } from './MovieListPage';
import { createFetcher } from './createFetcher';

const moviePageFetcher = createFetcher(async () => {
  const { MoviePage } = await import('./MoviePage');
  return MoviePage;
});

const imageFetcher = createFetcher((src) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(src);
    image.src = src;
  });
});

export class App extends Component {
  state = {
    currentId: null,
    isLoading: false,
    details: null,
    reviews: null,
  };

  handleMovieClick = (id) => {
    this.setState({
      currentId: id,
      isLoading: true,
    });

    const detailsFetch = fetchMovieDetails(id).then((details) => {
      if (this.state.currentId !== id) {
        return;
      }

      this.setState({
        details,
      });

      return imageFetcher.read(details.poster).then((poster) => {
        if (this.state.currentId !== id) {
          return;
        }

        this.setState({
          poster,
        });
      });
    });

    fetchMovieReviews(id).then((reviews) => {
      if (this.state.currentId !== id) {
        return;
      }

      this.setState({
        reviews,
      });
    });

    const moviePageLoad = moviePageFetcher.read().then((MoviePage) => {
      this.MoviePage = MoviePage;
    });

    Promise.all([detailsFetch, moviePageLoad]).then(() => {
      if (this.state.currentId !== id) {
        return;
      }

      this.setState({
        isLoading: false,
      });
    });
  };

  handleBackClick = () => {
    this.setState({
      currentId: null,
      isLoading: false,
      details: null,
      reviews: null,
    });
  };

  render() {
    const { currentId, details, reviews, isLoading } = this.state;

    return (
      <div>
        {currentId !== null && !isLoading
          ? this.renderDetail(currentId, details, reviews, isLoading)
          : this.renderList(isLoading ? currentId : null)}
      </div>
    );
  }

  renderDetail(id, details, reviews, isLoading) {
    return (
      <div>
        <button className="onBack" onClick={this.handleBackClick}>
          {'👈'}
        </button>
        <this.MoviePage id={id} details={details} reviews={reviews} />
      </div>
    );
  }

  renderList(loadingId) {
    return (
      <MovieListPage
        loadingId={loadingId}
        onMovieClick={(id) => this.handleMovieClick(id)}
      />
    );
  }
}
