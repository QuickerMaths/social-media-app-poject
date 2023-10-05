// export interface IBaseError {
//   name: string;
//   code: number;
//   message: string;
//   stack: string;
//   isOperational: boolean;
// }

export class BaseError extends Error {
  public code: number;
  public isOperational: boolean;

  constructor(
    name: string,
    code: number,
    message: string,
    isOperational: boolean
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.code = code;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}
