const { errorTexts } = require('../constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.message = message || errorTexts.unAuthorizedDefault;
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
