import sharp from 'sharp';
import ImageConverter from './ImageConverter';

class ResizeImageConverter extends ImageConverter {
  async convert({ width, height }): Promise<Buffer> {
    const image = await sharp(this.file).resize({ width, height }).toBuffer();
    return image;
  }
}

export default ResizeImageConverter;
