abstract class ImageConverter {
  protected file: Buffer;

  constructor(file: Buffer) {
    this.file = file;
  }

  abstract convert(config?: any): Promise<Buffer>;
}

export default ImageConverter;
