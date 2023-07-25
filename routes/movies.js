const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movies');
const { movieSchema, movieIdSchema } = require('../utils/joi-schemas');

router.get('/', getMovies);
router.post('/', celebrate({ body: movieSchema }), postMovie);
router.delete('/:movieId', celebrate({ params: movieIdSchema }), deleteMovie);

module.exports = router;
