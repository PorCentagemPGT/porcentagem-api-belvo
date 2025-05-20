import { HttpException, HttpStatus } from '@nestjs/common';

export class BelvoLinkNotFoundError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class BelvoLinkAlreadyExistsError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
  }
}
