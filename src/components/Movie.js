import React from 'react';
import { useParams } from 'react-router-dom';
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
// Components
import Grid from './Grid';
import Spinner from './Spinner';
import BreadCrumb from './BreadCrumb';
import MovieInfo from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
// Hook
import { useMovieFetch } from '../hooks/useMovieFetch';
// Image
import NoImage from '../images/no_image.jpg';

const Movie = () => {
  const { movieId } = useParams();

  const { state: movie, loading, error } = useMovieFetch(movieId);
  const { original_title, runtime, budget, revenue } = movie;

  if (loading) return <Spinner />;
  if (error) return <div>Someting went wrong...</div>;

  return (
    <>
      <BreadCrumb movieTitle={original_title} />
      <MovieInfo movie={movie} />
      <MovieInfoBar time={runtime} budget={budget} revenue={revenue} />
    </>
  );
};

export default Movie;
