import FileType from 'file-type';

export const isImage = (mime: string): boolean => (
  /^image\/*/ig.test(mime)
);

export const fileIsImage =  async (file: Buffer): Promise<boolean> => {
  const { mime } = await FileType.fromBuffer(file);
  return isImage(mime);
};

export const isPNG = (mime: string): boolean => (
  mime === 'image/png'
);

export const fileIsPNG =  async (file: Buffer): Promise<boolean> => {
  const { mime } = await FileType.fromBuffer(file);
  return isPNG(mime);
};

export const isJPEG = (mime: string): boolean => (
  mime === 'image/jpeg'
);

export const fileIsJPEG =  async (file: Buffer): Promise<boolean> => {
  const { mime } = await FileType.fromBuffer(file);
  return isJPEG(mime);
};

export const isWEBP = (mime: string): boolean => (
  mime === 'image/webp'
);

export const fileIsWEBP =  async (file: Buffer): Promise<boolean> => {
  const { mime } = await FileType.fromBuffer(file);
  return isWEBP(mime);
};

export const isAVIF = (mime: string): boolean => (
  mime === 'image/webp'
);

export const fileIsAVIF =  async (file: Buffer): Promise<boolean> => {
  const { mime } = await FileType.fromBuffer(file);
  return isAVIF(mime);
};
