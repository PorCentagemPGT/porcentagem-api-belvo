import { Injectable, Logger } from '@nestjs/common';
import { BelvoService } from '../belvo/belvo.service';

import { BelvoWidgetTokenError } from '../belvo/errors/belvo.errors';
import { BelvoApiError } from '../belvo/interfaces/belvo.interface';

@Injectable()
export class WidgetService {
  private readonly logger = new Logger(WidgetService.name);

  constructor(private readonly belvoService: BelvoService) {}

  async getWidgetToken(): Promise<{ token: string }> {
    try {
      this.logger.log('Getting widget token from Belvo...');

      const response = await this.belvoService.client.widgetToken.create();

      this.logger.debug(`Widget token response: ${JSON.stringify(response)}`);

      if (!response || !response.access) {
        throw new BelvoWidgetTokenError('Invalid response from Belvo API');
      }

      this.logger.log('Widget token generated successfully');
      this.logger.debug(`Generated token: ${JSON.stringify(response.access)}`);

      return { token: response.access };
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
