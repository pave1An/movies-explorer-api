const { errorTexts } = require('../constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.message = message || errorTexts.forbiddenDefault;
  }
}

module.exports = ForbiddenError;
