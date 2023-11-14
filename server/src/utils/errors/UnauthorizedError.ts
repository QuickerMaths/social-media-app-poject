import { BaseError } from "./BaseError.ts";

export default class UnauthorizedError extends BaseError {
  private static readonly _statusCode = 401;
  private readonly _code: number;
  private readonly _operational: boolean;
  private readonly _context: { [key: string]: any };

  constructor(params?: {
    code?: number;
    message?: string;
    operational?: boolean;
    context?: { [key: string]: any };
  }) {
    const { code, message, operational } = params || {};

    super(message || "Unauthorized");
    this._code = code || UnauthorizedError._statusCode;
    this._operational = operational || false;
    this._context = params?.context || {};

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  get errors() {
    return [{ message: this.message, context: this._context }];
  }

  get statusCode() {
    return this._code;
  }

  get operational() {
    return this._operational;
  }
}
