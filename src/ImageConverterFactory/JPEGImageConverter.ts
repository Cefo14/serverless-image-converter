import sharp from 'sharp';
import ImageConverter from './ImageConverter';

class JPEGImageConverter extends ImageConverter {
  async convert(): Promise<Buffer> {
    const image = await sharp(this.file).jpeg().toBuffer();
    return image;
  }
}

export default JPEGImageConverter;

