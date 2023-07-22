const { errorTexts } = require('../constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.message = message || errorTexts.notFoundDefault;
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
