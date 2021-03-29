import Joi from 'joi';

import Request from './Request';
import Response from './Response';

import ServiceFactory from '../ServiceFactory';
import ImageConverterFactory from '../ImageConverterFactory';

class Pipeline {
  private input: Request;

  constructor (input: Request) {
    this.input = input
  }

  private async validateInput(input: Request): Promise<Request> {
    const SchemaValidator = Joi.object<Request>({
      imageURL: Joi
        .alternatives()
        .try(
          Joi.string().trim().uri(),
          Joi.string().trim()
        )
        .required(),

      convertTo: Joi
        .string()
        .trim()
        .lowercase()
        .valid(
          'jpeg',
          'jpg',
          'png',
          'webp',
          'avif',
        )
        .required(),

      resize: Joi.object({
        width: Joi.number().greater(0).required(),
        height: Joi.number().greater(0).required(),
      }).optional(),
    });

    const request: Request = await SchemaValidator.validateAsync(input);
    return request;
  }

  private async downloadFile(url: string): Promise<Buffer> {
    const serviceFactory = new ServiceFactory('aws');
    const service = serviceFactory.initialize();
    const file = await service.download(url);
    return file;
  };

  private async uploadFile(file: Buffer): Promise<string> {
    const serviceFactory = new ServiceFactory('aws');
    const service = serviceFactory.initialize();
    const url = await service.upload(file);
    return url;
  };

  async exec(): Promise<Response> {
    const input = await this.validateInput(this.input);

    const { imageURL, convertTo } = input;
    const downloadedFile = await this.downloadFile(imageURL);

    const imageConverterFactory = new ImageConverterFactory();
    const ImageConverter = await imageConverterFactory.initialize(convertTo, downloadedFile);
    let image = await ImageConverter.convert();

    if (input.resize) {
      const imageResize = await imageConverterFactory.initialize('resize', image);
      image = await imageResize.convert(input.resize);
    }

    const url = await this.uploadFile(image);
    const response = { url };

    return response;
  }
}

export default Pipeline;
