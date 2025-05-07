import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Erro lançado quando há falha na conexão com a API do Belvo
 */
export class BelvoConnectionError extends HttpException {
  constructor(details?: string) {
    super(
      {
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'Falha na conexão com a API do Belvo',
        error: 'Belvo Connection Error',
        details,
      },
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}

/**
 * Erro lançado quando há falha na autenticação com a API do Belvo
 */
export class BelvoAuthenticationError extends HttpException {
  constructor(details?: string) {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Falha na autenticação com a API do Belvo',
        error: 'Belvo Authentication Error',
        details,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

/**
 * Erro lançado quando há falha na geração do token do widget
 */
export class BelvoWidgetTokenError extends HttpException {
  constructor(details?: string) {
    super(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Falha ao gerar token do widget',
        error: 'Belvo Widget Token Error',
        details,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

/**
 * Erro lançado quando há falha na validação dos dados
 */
export class BelvoValidationError extends HttpException {
  constructor(details?: string) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Dados inválidos',
        error: 'Belvo Validation Error',
        details,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
