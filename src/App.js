import React, { Component } from 'react';
import { fetchMovieDetails, fetchMovieReviews } from './api';
import { MoviePage } from './MoviePage';
import { MovieListPage } from './MovieListPage';
import { Placeholder } from './Placeholder';
import { Spinner } from './Spinner';
import { delay } from './delay';

export class App extends Component {
  state = {
    currentId: null,
    showDetail: false,
    isLoading: false,
    details: null,
    reviews: null,
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

    const detailsFetch = fetchMovieDetails(id);
    const reviewsFetch = fetchMovieReviews(id);

    detailsFetch.then((details) => {
      if (this.state.currentId !== id) {
        return;
      }

      this.setState({
        details,
        isLoading: false,
      });
    });

    reviewsFetch.then((reviews) => {
      if (this.state.currentId !== id) {
        return;
      }

      this.setState({
        reviews,
      });
    });

    // Promise.all([reviewsFetch, detailsFetch]).then(() => {
    //   if (this.state.currentId !== id) {
    //     return;
    //   }

    //   this.setState({
    //     isLoading: false,
    //   });
    // });
  };

  handleBackClick = () => {
    this.setState({
      currentId: null,
      isLoading: false,
      showDetail: false,
      details: null,
      reviews: null,
    });
  };

  render() {
    const { currentId, showDetail, details, reviews, isLoading } = this.state;

    return (
      <div>
        {showDetail
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
        <Placeholder isLoading={isLoading} fallback={<Spinner size="large" />}>
          <MoviePage id={id} details={details} reviews={reviews} />
        </Placeholder>
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
