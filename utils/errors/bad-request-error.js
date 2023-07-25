const { errorTexts } = require('../constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.message = message || errorTexts.badRequestDefault;
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
