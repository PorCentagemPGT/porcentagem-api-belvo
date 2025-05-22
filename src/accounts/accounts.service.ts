import { Injectable, Logger } from '@nestjs/common';
import { BelvoService } from '../belvo/belvo.service';
import { ListAccountsRequestDto, ListAccountsResponseDto } from './dto';
import {
  BelvoLinkAlreadyExistsError,
  BelvoLinkNotFoundError,
} from '../belvo/errors/link-account.errors';
import { BelvoApiError } from '../belvo/interfaces/belvo.interface';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AccountsService {
  private readonly logger = new Logger(AccountsService.name);

  constructor(
    private readonly belvoService: BelvoService,
    private readonly database: DatabaseService,
  ) {}

  async listAllBelvoBankAccountsByLinkId(
    data: ListAccountsRequestDto,
  ): Promise<ListAccountsResponseDto[]> {
    try {
      this.logger.log(`Listing accounts for link ${data.linkId}`);

      const accounts = await this.belvoService.client.accounts.list({
        link: data.linkId,
      });

      this.logger.debug(`Accounts response: ${JSON.stringify(accounts)}`);

      return accounts.map((account) => new ListAccountsResponseDto(account));
    } catch (error) {
      this.logger.error('Error listing accounts:', error);

      if ((error as BelvoApiError).statusCode === 404) {
        throw new BelvoLinkNotFoundError('Link não encontrado');
      }

      throw error;
    }
  }

  async createLinkBank(data: ListAccountsRequestDto) {
    // Verifica se o link já está registrado
    const existingLink = await this.database.linkBank.findUnique({
      where: {
        linkId: data.linkId,
      },
    });

    if (existingLink) {
      this.logger.error('Link já registrado', {
        linkId: data.linkId,
      });
      throw new BelvoLinkAlreadyExistsError(
        'Link já registrado para outro usuário',
      );
    }

    try {
      this.logger.log(`Creating account for link ${data.linkId}`);

      const account = await this.database.linkBank.create({
        data: {
          linkId: data.linkId,
          userId: data.userId,
          institutionName: data.institutionName,
        },
      });

      this.logger.debug(`Account response: ${JSON.stringify(account)}`);

      return account;
    } catch (error) {
      this.logger.error('Error creating account:', error);

      if ((error as BelvoApiError).statusCode === 404) {
        throw new BelvoLinkNotFoundError('Link não encontrado');
      }

      throw error;
    }
  }

  async listAllLinkBankByUserId(userId: string) {
    try {
      this.logger.log(`Reading account for user ${userId}`);

      const accounts = await this.database.linkBank.findMany({
        where: {
          userId,
        },
      });

      this.logger.debug(`Account response: ${JSON.stringify(accounts)}`);

      return accounts;
    } catch (error) {
      this.logger.error('Error reading account:', error);

      throw error;
    }
  }

  async deleteLinkBank(linkId: string) {
    try {
      this.logger.log(`Deleting account for link ${linkId}`);

      const account = await this.database.linkBank.delete({
        where: {
          linkId,
        },
      });

      this.logger.debug(`Account response: ${JSON.stringify(account)}`);

      return account;
    } catch (error) {
      this.logger.error('Error deleting account:', error);

      throw error;
    }
  }

  async createBankAccount(data: ListAccountsRequestDto) {
    try {
      this.logger.log(`Creating account for link ${data.linkId}`);

      const account = await this.database.bankAccount.create({
        data: {
          linkId: data.linkId,
          userId: data.userId,
          bankAccountId: data.bankAccountId,
          institutionName: data.institutionName,
        },
      });

      this.logger.debug(`Account response: ${JSON.stringify(account)}`);

      return account;
    } catch (error) {
      this.logger.error('Error creating account:', error);

      if ((error as BelvoApiError).statusCode === 404) {
        throw new BelvoLinkNotFoundError('Link não encontrado');
      }

      throw error;
    }
  }

  async listAllBankAccountsByUserId(userId: string) {
    try {
      this.logger.log(`Reading account for user ${userId}`);

      const accounts = await this.database.bankAccount.findMany({
        where: {
          userId,
        },
      });

      this.logger.debug(`Account response: ${JSON.stringify(accounts)}`);

      return accounts;
    } catch (error) {
      this.logger.error('Error reading account:', error);

      throw error;
    }
  }

  async deleteBankAccount(linkId: string) {
    try {
      this.logger.log(`Deleting account for link ${linkId}`);

      const account = await this.database.bankAccount.delete({
        where: {
          linkId,
        },
      });

      this.logger.debug(`Account response: ${JSON.stringify(account)}`);

      return account;
    } catch (error) {
      this.logger.error('Error deleting account:', error);

      throw error;
    }
  }
}
