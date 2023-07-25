const BadRequestError = require('../utils/errors/bad-request-error');
const ConflictError = require('../utils/errors/conflict-error');
const ForbiddenError = require('../utils/errors/forbidden-error');
const InternalError = require('../utils/errors/internal-error');
const NotFoundError = require('../utils/errors/not-found-error');
const UnauthorizedError = require('../utils/errors/unauthorized-error');
const { errorTexts } = require('../utils/constants');

function handleError(err, req, res, next) {
  function setError() {
    if (err.code === 11000) {
      return new ConflictError(errorTexts.conflictEmail);
    }
    if (err.errors?.email) {
      return new BadRequestError(`${err.errors.email.value} ${errorTexts.badRequestEmail}`);
    }
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      return new BadRequestError();
    }
    if (
      err instanceof NotFoundError
      || err instanceof UnauthorizedError
      || err instanceof BadRequestError
      || err instanceof ForbiddenError
    ) {
      return err;
    }

    return new InternalError();
  }

  const error = setError();
  res.status(error.statusCode).send({ message: error.message });
  next();
}

module.exports = handleError;
