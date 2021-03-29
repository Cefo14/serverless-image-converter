import path from 'path';
import 'jest-extended';

import ImageConverterFactory from '..';
import InvalidConverterTypeError from '../errors/InvalidConverterTypeError';
import InvalidConverterFileError from '../errors/InvalidConverterFileError';

import File from '../../utils/File';
import * as MIME from '../../utils/MIME';

describe('ImageConverterFactory', () => {
  let dummyImage: Buffer;

  beforeEach(async () => {
    const dummyImagePath = path.join(__dirname, 'mocks', 'dummy.png');
    const inputData = await File.read(dummyImagePath);
    dummyImage = inputData;
  })

  describe('when type is png', () => {
    it('should convert image to png', async () => {
      const imageConverterFactory = new ImageConverterFactory();
      const imageConverter = await imageConverterFactory.initialize('png', dummyImage);
      const image = await imageConverter.convert();
      const isPNG = await MIME.fileIsPNG(image);
      expect(isPNG).toBeTrue();
    });
  });

  describe('when type is jpeg', () => {
    it('should convert image to jpeg', async () => {
      const imageConverterFactory = new ImageConverterFactory();
      const imageConverter = await imageConverterFactory.initialize('jpeg', dummyImage);
      const image = await imageConverter.convert();
      const isJPEG = await MIME.fileIsJPEG(image);
      expect(isJPEG).toBeTrue();
    });
  });

  describe('when type is webp', () => {
    it('should convert image to webp', async () => {
      const imageConverterFactory = new ImageConverterFactory();
      const imageConverter = await imageConverterFactory.initialize('webp', dummyImage);
      const image = await imageConverter.convert();
      const isWEBP = await MIME.fileIsWEBP(image);
      expect(isWEBP).toBeTrue();
    });
  });

  describe('when type is avif', () => {
    it('should convert image to avif', async () => {
      const imageConverterFactory = new ImageConverterFactory();
      const imageConverter = await imageConverterFactory.initialize('avif', dummyImage);
      const image = await imageConverter.convert();
      const isWEBP = await MIME.fileIsWEBP(image);
      expect(isWEBP).toBeTrue();
    });
  });

  describe('when resize image', () => {
    it('should resize image', async () => {
      const imageConverterFactory = new ImageConverterFactory();
      const imageConverter = await imageConverterFactory.initialize('resize', dummyImage);
      const image = await imageConverter.convert({ width: 50,  height: 50 });
      expect(image.length).toBeLessThan(dummyImage.length);
    });
  });

  describe('when type is invalid', () => {
    it('should throw InvalidConverterTypeError', async () => {
      try {
        const imageConverterFactory = new ImageConverterFactory();
        await imageConverterFactory.initialize('mordor', dummyImage);
      }

      catch(e)  {
        expect(e).toBeInstanceOf(InvalidConverterTypeError);
      }
    });
  });

  describe('when file is invalid', () => {
    it('should throw InvalidConverterFileError', async () => {
      try {
        const imageConverterFactory = new ImageConverterFactory();
        const invalidFile = Buffer.concat([dummyImage, Buffer.from('FILE_ERROR')]);
        await imageConverterFactory.initialize('png', invalidFile);
      }

      catch(e)  {
        expect(e).toBeInstanceOf(InvalidConverterFileError);
      }
    });
  });
});
