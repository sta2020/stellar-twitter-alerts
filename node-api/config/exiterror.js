function ExitError(message) {
  this.name = 'ExitError';
  this.message = message || 'Error occured. Return to user scope';
  this.stack = (new Error()).stack;
}
ExitError.prototype = Object.create(Error.prototype);
ExitError.prototype.constructor = ExitError;

module.exports = ExitError;