import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import belvo from 'belvo';
import {
  BelvoClient,
  BelvoConfig,
  BelvoApiError,
} from './interfaces/belvo.interface';
import {
  BelvoAuthenticationError,
  BelvoConnectionError,
  BelvoWidgetTokenError,
} from './errors/belvo.errors';

@Injectable()
export class BelvoService implements OnModuleInit {
  private client: BelvoClient;
  private isConnected = false;
  private readonly logger = new Logger(BelvoService.name);
  private readonly config: BelvoConfig;

  constructor(private readonly configService: ConfigService) {
    this.config = {
      id: this.configService.getOrThrow<string>('BELVO_ID'),
      password: this.configService.getOrThrow<string>('BELVO_PASSWORD'),
      environment:
        this.configService.get<string>('BELVO_ENVIRONMENT') || 'sandbox',
    };

    const envUrl =
      this.config.environment === 'sandbox'
        ? 'https://sandbox.belvo.com'
        : 'https://api.belvo.com';

    this.logger.log('Initializing Belvo client...');
    this.client = new belvo(
      this.config.id,
      this.config.password,
      envUrl,
    ) as unknown as BelvoClient;

    this.logger.log('Belvo client initialized');
  }

  async onModuleInit() {
    try {
      await this.connect();
    } catch (error) {
      this.logger.error('Failed to connect to Belvo API:', error);
      throw new BelvoConnectionError(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  }

  private async connect() {
    if (this.isConnected) {
      return;
    }

    try {
      this.logger.log('Connecting to Belvo API...');
      await this.client.connect();
      this.isConnected = true;
      this.logger.log('Connected to Belvo API');
    } catch (error) {
      this.logger.error('Error connecting to Belvo API:', error);
      const belvoError = error as BelvoApiError;

      if (belvoError.response?.status === 401) {
        throw new BelvoAuthenticationError(
          'Credenciais inválidas. Verifique BELVO_ID e BELVO_PASSWORD',
        );
      }

      throw new BelvoConnectionError(belvoError.message || 'Unknown error');
    }
  }

  async generateWidgetToken(): Promise<string> {
    try {
      if (!this.isConnected) {
        await this.connect();
      }

      this.logger.log('Generating widget token...');
      const token = await this.client.widgetToken.create();

      if (!token?.access) {
        throw new BelvoWidgetTokenError('Token inválido retornado pela API');
      }

      this.logger.log('Widget token generated successfully');

      return token.access;
    } catch (error) {
      this.logger.error('Error generating widget token:', error);
      const belvoError = error as BelvoApiError;

      if (
        error instanceof BelvoAuthenticationError ||
        error instanceof BelvoConnectionError ||
        error instanceof BelvoWidgetTokenError
      ) {
        throw error;
      }

      throw new BelvoWidgetTokenError(
        belvoError.response?.data?.detail ||
          belvoError.message ||
          'Unknown error',
      );
    }
  }
}
