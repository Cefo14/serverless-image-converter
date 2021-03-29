import ImageConverter from './ImageConverter';

import JPEGImageConverter from './JPEGImageConverter';
import PNGImageConverter from './PNGImageConverter';
import WEBPImageConverter from './WEBPImageConverter';
import AVIFImageConverter from './AVIFImageConverter';
import ResizeImageConverter from './ResizeImageConverter';

import InvalidConverterTypeError from './errors/InvalidConverterTypeError';
import InvalidConverterFileError from './errors/InvalidConverterFileError';

import { fileIsImage } from '../utils/MIME';

class ImageConverterFactory {
  async initialize(type: string, file: Buffer): Promise<ImageConverter>{
    const isImage = await fileIsImage(file);
    if (!isImage) throw new InvalidConverterFileError();

    switch(type.toLowerCase()) {
      case 'jpeg':
      case 'jpg':
        return new JPEGImageConverter(file);
      case 'png':
          return new PNGImageConverter(file);
      case 'webp':
        return new WEBPImageConverter(file);
      case 'avif':
        return new AVIFImageConverter(file);
      case 'resize':
        return new ResizeImageConverter(file);
      default:
        throw new InvalidConverterTypeError();
    }
  }
}

export default ImageConverterFactory;
