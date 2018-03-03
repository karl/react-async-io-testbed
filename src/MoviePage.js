import React from 'react';
import { movieDetailsJSON, movieReviewsJSON } from './api';

export const MoviePage = ({ id }) => {
  return (
    <div>
      <MovieDetails id={id} />
      <MovieReviews id={id} />
    </div>
  );
};

const MovieDetails = ({ id }) => {
  const movie = movieDetailsJSON[id];
  return (
    <div className="MovieDetails">
      <MoviePoster src={movie.poster} />
      <h1>{movie.title}</h1>
      <MovieMetrics {...movie} />
    </div>
  );
};

const MoviePoster = ({ src }) => {
  return (
    <div className="MoviePoster">
      <img src={src} alt="poster" />
    </div>
  );
};

const MovieMetrics = (movie) => {
  return (
    <div>
      <div>
        <h3>Tomatometer</h3>
        {movie.rating > 70 ? '🍅' : '🤢'}
        {movie.rating}%
      </div>
      <div>
        <h3>Critics Consensus</h3>
        {movie.consensus}
      </div>
    </div>
  );
};

const MovieReviews = ({ id }) => {
  const reviews = movieReviewsJSON[id];
  return (
    <div className="MovieReviews">
      {reviews.map((review, index) => (
        <div className="review" key={index}>
          <div className="summary">{review.summary}</div>
          <div className="author">{review.author}</div>
        </div>
      ))}
    </div>
  );
};
