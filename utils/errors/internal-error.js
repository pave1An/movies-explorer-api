const { errorTexts } = require('../constants');

class InternalError extends Error {
  constructor(message) {
    super(message);
    this.message = message || errorTexts.internalDefault;
    this.statusCode = 500;
  }
}

module.exports = InternalError;
