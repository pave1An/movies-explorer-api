const { errorTexts } = require('../constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.message = message || errorTexts.conflictDefault;
  }
}

module.exports = ConflictError;
