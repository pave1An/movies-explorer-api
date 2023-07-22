const Movie = require('../models/movie');
const { errorTexts } = require('../utils/constants');
const ForbiddenError = require('../utils/errors/forbidden-error');
const NotFoundError = require('../utils/errors/not-found-error');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findOne({ _id: req.params.movieId })
    .orFail(() => new NotFoundError(errorTexts.notFoundMovie))
    .then((movie) => {
      const movieOwner = movie.owner.toString();
      if (movieOwner !== req.user._id) {
        throw new ForbiddenError(errorTexts.forbiddenMovieDelete);
      } else {
        const movieId = movie._id.toString();
        Movie.deleteOne({ _id: movieId })
          .then((data) => res.send(data))
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  postMovie,
  deleteMovie,
};
