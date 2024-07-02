/**
 * OilPump Error Interface
 */
export interface OPError {
  code: number | String;
  msg: string;
}

/**
 * Thrown when the request input is invalid
 */
export class BadRequest extends Error {
  code = BadRequest.name;
  status = 400;
  constructor(message: string) {
    super(message);
  }
}

export class ResourceNotFound extends Error {
  code = ResourceNotFound.name;
  status = 404;
  constructor(message = 'Resource not found') {
    super(message);
  }
}

export class ForbiddenError extends Error {
  code = ForbiddenError.name;
  status = 403;
  constructor(message = 'Forbidden Error') {
    super(message);
  }
}
