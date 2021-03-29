class InvalidConverterFileError extends Error {
  constructor(...args) {
    super(...args);
    this.name = 'InvalidConverterFileError';
    this.message = 'the file must be an image';
    if (Error.captureStackTrace) Error.captureStackTrace(this, InvalidConverterFileError);
    Object.setPrototypeOf(this, InvalidConverterFileError.prototype);
  }
}

export default InvalidConverterFileError;
