import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import {
  BankAccountRequestDto,
  BankAccountResponseDto,
  LinkBankRequestDto,
  LinkBankResponseDto,
  ListBelvoAccountsRequestDto,
  ListBelvoAccountsResponseDto,
} from './dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { UpdateBankAccountsDto } from './dto/update-bank-accounts.dto';

@ApiTags('Bank Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get('belvo/:linkId')
  @ApiOperation({
    summary: 'Listar contas no Belvo',
    description:
      'Lista todas as contas bancárias disponíveis no Belvo para um determinado link',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de contas do Belvo',
    type: [ListBelvoAccountsResponseDto],
  })
  @ApiResponse({
    status: 404,
    description: 'Link não encontrado',
  })
  async listBelvoAccounts(
    @Param('linkId') linkId: string,
  ): Promise<{ data: ListBelvoAccountsResponseDto[] }> {
    const request: ListBelvoAccountsRequestDto = { linkId };
    return this.accountsService.listAllBelvoBankAccountsByLinkId(request);
  }

  @Post('link')
  @ApiOperation({
    summary: 'Vincular conta bancária',
    description: 'Vincula uma nova conta bancária ao usuário através do Belvo',
  })
  @ApiResponse({
    status: 201,
    description: 'Conta vinculada com sucesso',
    type: LinkBankResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Link já registrado para outro usuário',
  })
  @ApiResponse({
    status: 404,
    description: 'Link não encontrado',
  })
  async linkBankAccount(
    @Body() data: LinkBankRequestDto,
  ): Promise<{ data: LinkBankResponseDto }> {
    return this.accountsService.createLinkBank(data);
  }

  @Get('link/:userId')
  @ApiOperation({
    summary: 'Listar contas vinculadas',
    description: 'Lista todas as contas bancárias vinculadas a um usuário',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de contas vinculadas',
    type: [LinkBankResponseDto],
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  async listLinkedAccounts(
    @Param('userId') userId: string,
  ): Promise<{ data: LinkBankResponseDto[] }> {
    return this.accountsService.listAllLinkBankByUserId(userId);
  }

  @Delete('link/:linkId')
  @ApiOperation({
    summary: 'Remover link do banco',
    description: 'Remove o link de um banco vinculado através do Belvo',
  })
  @ApiResponse({
    status: 200,
    description: 'Link removido com sucesso',
    type: LinkBankResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Link não encontrado',
  })
  async deleteLinkBank(
    @Param('linkId') linkId: string,
  ): Promise<{ data: LinkBankResponseDto }> {
    console.log(`Deleting link bank for id ${linkId}`);
    const account = await this.accountsService.deleteLinkBank(linkId);
    return { data: account };
  }

  @Post('bank')
  @ApiOperation({
    summary: 'Registrar conta bancária',
    description: 'Registra uma nova conta bancária no sistema',
  })
  @ApiResponse({
    status: 201,
    description: 'Conta registrada com sucesso',
    type: BankAccountResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  async registerBankAccount(
    @Body() data: BankAccountRequestDto,
  ): Promise<{ data: BankAccountResponseDto }> {
    return this.accountsService.createBankAccount(data);
  }

  @Get('bank/userId/:userId')
  @ApiOperation({
    summary: 'Listar contas bancárias',
    description: 'Lista todas as contas bancárias de um usuário',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de contas bancárias',
    type: [BankAccountResponseDto],
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  async listAllBankAccountsByUserId(
    @Param('userId') userId: string,
  ): Promise<{ data: BankAccountResponseDto[] }> {
    return this.accountsService.listAllBankAccountsByUserId(userId);
  }

  @Get('bank/linkId/:linkId')
  @ApiOperation({
    summary: 'Listar contas bancárias',
    description: 'Lista todas as contas bancárias de um usuário',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de contas bancárias',
    type: [BankAccountResponseDto],
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  async listAllBankAccountsByLinkId(
    @Param('linkId') linkId: string,
  ): Promise<{ data: BankAccountResponseDto[] }> {
    return this.accountsService.listAllBankAccountsByLinkId(linkId);
  }

  @Patch('/bank/:id')
  @ApiOperation({
    summary: 'Atualiza uma conta bancária',
    description: 'Atualiza os dados de uma conta bancária existente',
  })
  @ApiResponse({
    status: 200,
    description: 'Conta bancária atualizada com sucesso',
    type: BankAccountResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Conta bancária não encontrada',
  })
  async updateBankAccount(
    @Param('id') id: string,
    @Body() data: UpdateBankAccountDto,
  ): Promise<{ data: BankAccountResponseDto }> {
    return this.accountsService.updateBankAccount(id, data);
  }

  @Patch('batch')
  @ApiOperation({
    summary: 'Atualiza contas bancárias em lote',
    description: 'Atualiza os dados de várias contas bancárias existentes',
  })
  @ApiResponse({
    status: 200,
    description: 'Contas bancárias atualizadas com sucesso',
    type: [BankAccountResponseDto],
  })
  async updateBankAccounts(
    @Body() data: UpdateBankAccountsDto,
  ): Promise<{ data: BankAccountResponseDto[] }> {
    return this.accountsService.updateBankAccounts(data.accounts);
  }
}
