import React from 'react';
import { movieReviewsJSON } from './api';

export const MoviePage = ({ id, details }) => {
  return (
    <div>
      <MovieDetails details={details} />
      <MovieReviews id={id} />
    </div>
  );
};

const MovieDetails = ({ details }) => {
  return (
    <div className="MovieDetails">
      <MoviePoster src={details.poster} />
      <h1>{details.title}</h1>
      <MovieMetrics {...details} />
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
