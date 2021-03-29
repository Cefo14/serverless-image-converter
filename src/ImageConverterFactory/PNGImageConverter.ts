import sharp from 'sharp';
import ImageConverter from './ImageConverter';

class PNGImageConverter extends ImageConverter {
  async convert(): Promise<Buffer> {
    const image = await sharp(this.file).png().toBuffer();
    return image;
  }
}

export default PNGImageConverter;
