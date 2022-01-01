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
import Actor from './Actor';
// Hook
import { useMovieFetch } from '../hooks/useMovieFetch';
// Image
import NoImage from '../images/no_image.jpg';

const Movie = () => {
  const { movieId } = useParams();

  const { state: movie, loading, error } = useMovieFetch(movieId);
  const { original_title, runtime, budget, revenue, actors } = movie;

  if (loading) return <Spinner />;
  if (error) return <div>Someting went wrong...</div>;

  return (
    <>
      <BreadCrumb movieTitle={original_title} />
      <MovieInfo movie={movie} />
      <MovieInfoBar time={runtime} budget={budget} revenue={revenue} />
      <Grid header='Actors'>
        {actors.map(({ credit_id, name, character, profile_path }) => (
          <Actor
            key={credit_id}
            name={name}
            character={character}
            imageUrl={
              profile_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${profile_path}`
                : NoImage
            }
          />
        ))}
      </Grid>
    </>
  );
};

export default Movie;
