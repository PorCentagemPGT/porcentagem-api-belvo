import { Injectable, Logger } from '@nestjs/common';
import { BelvoService } from '../belvo/belvo.service';
import { WidgetTokenResponseDto } from './dto';
import { BelvoWidgetTokenError } from '../belvo/errors/belvo.errors';
import { BelvoApiError } from '../belvo/interfaces/belvo.interface';

@Injectable()
export class WidgetService {
  private readonly logger = new Logger(WidgetService.name);

  constructor(private readonly belvoService: BelvoService) {}

  async getWidgetToken(): Promise<WidgetTokenResponseDto> {
    try {
      this.logger.log('Getting widget token from Belvo...');

      const response = await this.belvoService.client.widgetToken.create();

      if (!response || !response.access) {
        throw new BelvoWidgetTokenError('Invalid response from Belvo API');
      }

      return new WidgetTokenResponseDto({
        access: response.access,
        expiresIn: 3600, // Token expira em 1 hora
      });
    } catch (error) {
      this.logger.error('Error getting widget token:', error);

      const belvoError = error as BelvoApiError;
      throw new BelvoWidgetTokenError(
        belvoError.response?.data?.detail ||
          belvoError.message ||
          'Unknown error',
      );
    }
  }
}
