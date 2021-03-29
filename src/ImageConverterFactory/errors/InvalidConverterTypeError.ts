class InvalidConverterTypeError extends Error {
  constructor(...args) {
    super(...args);
    this.name = 'InvalidConverterTypeError';
    this.message = 'invalid converter type';
    if (Error.captureStackTrace) Error.captureStackTrace(this, InvalidConverterTypeError);
    Object.setPrototypeOf(this, InvalidConverterTypeError.prototype);
  }
}

export default InvalidConverterTypeError;
