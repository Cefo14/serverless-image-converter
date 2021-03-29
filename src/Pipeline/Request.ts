interface Request {
  imageURL: string;
  convertTo: string;
  resize?: {
    width: number,
    height: number,
  }
}

export default Request;
