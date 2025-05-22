import { Injectable, Logger } from '@nestjs/common';
import { BelvoService } from '../belvo/belvo.service';
import { ListTransactionsRequestDto, ListTransactionsResponseDto } from './dto';
import { BelvoLinkNotFoundError } from '../belvo/errors/link-account.errors';
import { BelvoApiError } from '../belvo/interfaces/belvo.interface';

@Injectable()
export class TransactionsService {
  private readonly logger = new Logger(TransactionsService.name);

  constructor(private readonly belvoService: BelvoService) {}

  async listTransactions(
    data: ListTransactionsRequestDto,
  ): Promise<ListTransactionsResponseDto[]> {
    try {
      this.logger.log(`Listing transactions for link ${data.linkId}`);

      const filters: {
        link: string;
        date_from?: string;
        date_to?: string;
      } = {
        link: data.linkId,
      };

      if (data.dateFrom) {
        filters.date_from = data.dateFrom;
      }

      if (data.dateTo) {
        filters.date_to = data.dateTo;
      }

      const transactions = await this.belvoService.client.transactions.list({
        limit: 100,
        filters,
      });

      this.logger.debug(
        `Transactions response: ${JSON.stringify(transactions)}`,
      );

      return transactions.map(
        (transaction) => new ListTransactionsResponseDto(transaction),
      );
    } catch (error) {
      this.logger.error('Error listing transactions:', error);

      if ((error as BelvoApiError).statusCode === 404) {
        throw new BelvoLinkNotFoundError('Link não encontrado');
      }

      throw error;
    }
  }
}
