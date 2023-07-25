const { Joi } = require('celebrate');

module.exports = {
  userSchema: Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required().min(3),
    name: Joi.string().required().min(2).max(30),
  }),

  userUpdateSchema: Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }).optional(),
    name: Joi.string().optional().min(2).max(30),
  }),

  loginSchema: Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required().min(3),
  }),

  movieSchema: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().length(4),
    description: Joi.string().required(),
    image: Joi.string().required().uri({ scheme: ['http', 'https'] }),
    trailerLink: Joi.string().required().uri({ scheme: ['http', 'https'] }),
    thumbnail: Joi.string().required().uri({ scheme: ['http', 'https'] }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),

  movieIdSchema: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
};
