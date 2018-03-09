import React, { Component } from 'react';
import { fetchMovieDetails, fetchMovieReviews } from './api';
import { MovieListPage } from './MovieListPage';
import { createFetcher } from './createFetcher';

const movieDetailsFetcher = createFetcher((id) => {
  return fetchMovieDetails(id);
});

const movieReviewsFetcher = createFetcher((id) => {
  return fetchMovieReviews(id);
});

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
    poster: null,
  };

  setStateIfCurrent = (id, state) => {
    if (this.state.currentId !== id) {
      return;
    }

    this.setState(state);
  };

  handleMovieClick = (id) => {
    this.setState({
      currentId: id,
      isLoading: true,
    });

    const detailsFetch = movieDetailsFetcher.read(id).then((details) => {
      this.setStateIfCurrent(id, {
        details,
      });

      return imageFetcher.read(details.poster).then((poster) => {
        this.setStateIfCurrent(id, {
          poster,
        });
      });
    });

    movieReviewsFetcher.read(id).then((reviews) => {
      this.setStateIfCurrent(id, {
        reviews,
      });
    });

    const moviePageLoad = moviePageFetcher.read().then((MoviePage) => {
      this.MoviePage = MoviePage;
    });

    Promise.all([detailsFetch, moviePageLoad]).then(() => {
      this.setStateIfCurrent(id, {
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
      poster: null,
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
