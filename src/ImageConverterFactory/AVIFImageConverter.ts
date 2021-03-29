import sharp from 'sharp';
import ImageConverter from './ImageConverter';

class AVIFImageConverter extends ImageConverter {
  async convert(): Promise<Buffer> {
    const image = await sharp(this.file).webp().toBuffer();
    return image;
  }
}

export default AVIFImageConverter;
