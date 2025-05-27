import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AccountStatus } from '@prisma/client';
import { BelvoService } from '../belvo/belvo.service';
import { DatabaseService } from '../database/database.service';
import {
  LinkBankRequestDto,
  LinkBankResponseDto,
  ListBelvoAccountsRequestDto,
  ListBelvoAccountsResponseDto,
} from './dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import {
  BelvoLinkAlreadyExistsError,
  BelvoLinkNotFoundError,
} from '../belvo/errors/link-account.errors';
import { BelvoApiError } from '../belvo/interfaces/belvo.interface';
import {
  BankAccountRequestDto,
  BankAccountResponseDto,
} from './dto/bank-account.dto';

@Injectable()
export class AccountsService {
  private readonly logger = new Logger(AccountsService.name);

  constructor(
    private readonly belvoService: BelvoService,
    private readonly database: DatabaseService,
  ) {}

  async listAllBelvoBankAccountsByLinkId(
    data: ListBelvoAccountsRequestDto,
  ): Promise<{ data: ListBelvoAccountsResponseDto[] }> {
    try {
      this.logger.log(`Listing accounts for link ${data.linkId}`);

      const accounts = await this.belvoService.client.accounts.list({
        link: data.linkId,
      });

      this.logger.debug(`Accounts response: ${JSON.stringify(accounts)}`);

      const allowedCategories = [
        'CREDIT_CARD',
        'LOAN_ACCOUNT',
        'CHECKING_ACCOUNT',
      ];
      const filteredAccounts = accounts.filter((account) =>
        allowedCategories.includes(account.category),
      );

      this.logger.debug(
        `Filtered accounts: ${JSON.stringify(filteredAccounts)}`,
      );

      return {
        data: filteredAccounts.map(
          (account) => new ListBelvoAccountsResponseDto(account),
        ),
      };
    } catch (error) {
      this.logger.error('Error listing accounts:', error);

      if ((error as BelvoApiError).statusCode === 404) {
        throw new BelvoLinkNotFoundError('Link não encontrado');
      }

      throw error;
    }
  }

  async createLinkBank(data: LinkBankRequestDto) {
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

      return { data: account };
    } catch (error) {
      this.logger.error('Error creating account:', error);

      if ((error as BelvoApiError).statusCode === 404) {
        throw new BelvoLinkNotFoundError('Link não encontrado');
      }

      throw error;
    }
  }

  async listAllLinkBankByUserId(
    userId: string,
  ): Promise<{ data: LinkBankResponseDto[] }> {
    try {
      this.logger.log(`Reading account for user ${userId}`);

      const accounts = await this.database.linkBank.findMany({
        where: {
          userId,
        },
      });

      this.logger.debug(`Account response: ${JSON.stringify(accounts)}`);

      return { data: accounts };
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

  async createBankAccount(
    data: BankAccountRequestDto,
  ): Promise<{ data: BankAccountResponseDto }> {
    try {
      this.logger.log(`Creating account for link ${data.linkId}`);

      const account = await this.database.bankAccount.create({
        data: {
          linkId: data.linkId,
          userId: data.userId,
          bankAccountId: data.bankAccountId,
          category: data.category,
          type: data.type,
          number: data.number,
          name: data.name,
        },
      });

      this.logger.debug(`Account response: ${JSON.stringify(account)}`);

      return { data: account };
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

      return { data: accounts };
    } catch (error) {
      this.logger.error('Error reading account:', error);

      throw error;
    }
  }

  async listAllBankAccountsByLinkId(linkId: string) {
    try {
      this.logger.log(`Reading account for link ${linkId}`);

      const accounts = await this.database.bankAccount.findMany({
        where: {
          linkId,
        },
      });

      this.logger.debug(`Account response: ${JSON.stringify(accounts)}`);

      return { data: accounts };
    } catch (error) {
      this.logger.error('Error reading account:', error);

      throw error;
    }
  }

  async updateBankAccount(
    id: string,
    data: UpdateBankAccountDto,
  ): Promise<{ data: BankAccountResponseDto }> {
    try {
      this.logger.log(
        `Updating account ${id} with data: ${JSON.stringify(data)}`,
      );

      const account = await this.database.bankAccount.update({
        where: { id },
        data,
      });

      if (!account) {
        throw new NotFoundException('Conta bancária não encontrada');
      }

      this.logger.debug(`Account response: ${JSON.stringify(account)}`);

      const response = new BankAccountResponseDto();
      response.linkId = account.linkId;
      response.bankAccountId = account.bankAccountId;
      response.userId = account.userId;
      response.createdAt = account.createdAt;
      response.updatedAt = account.updatedAt;
      return { data: response };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(
        `Error updating account: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      throw error;
    }
  }

  async updateBankAccounts(
    accounts: { id: string; status: AccountStatus }[],
  ): Promise<{ data: BankAccountResponseDto[] }> {
    try {
      this.logger.log(
        `Updating ${accounts.length} accounts in batch: ${JSON.stringify(accounts)}`,
      );

      // Usar transação para garantir que todas as atualizações sejam feitas ou nenhuma
      const updatedAccounts = await this.database.$transaction(
        async (prisma) => {
          return Promise.all(
            accounts.map(async (account) => {
              const updated = await prisma.bankAccount.update({
                where: { id: account.id },
                data: { status: account.status },
              });

              const response = new BankAccountResponseDto();
              response.linkId = updated.linkId;
              response.bankAccountId = updated.bankAccountId;
              response.userId = updated.userId;
              response.createdAt = updated.createdAt;
              response.updatedAt = updated.updatedAt;
              return response;
            }),
          );
        },
      );

      this.logger.debug(
        `Batch update response: ${JSON.stringify(updatedAccounts)}`,
      );

      return { data: updatedAccounts };
    } catch (error) {
      this.logger.error(
        `Error updating accounts in batch: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      throw error;
    }
  }

  async deleteBankAccount(bankAccountId: string) {
    try {
      this.logger.log(`Deleting account for bank account ${bankAccountId}`);

      const account = await this.database.bankAccount.delete({
        where: {
          bankAccountId,
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
