import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

@ApiTags('Bank Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

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
  ): Promise<LinkBankResponseDto[]> {
    return this.accountsService.listAllLinkBankByUserId(userId);
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
  ): Promise<BankAccountResponseDto> {
    return this.accountsService.createBankAccount(data);
  }

  @Get('bank/:userId')
  @ApiOperation({
    summary: 'Listar contas vinculadas',
    description: 'Lista todas as contas bancárias vinculadas a um usuário',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de contas vinculadas',
    type: [BankAccountResponseDto],
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  async listBankAccounts(
    @Param('userId') userId: string,
  ): Promise<BankAccountResponseDto[]> {
    return this.accountsService.listAllBankAccountsByUserId(userId);
  }

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
  ): Promise<ListBelvoAccountsResponseDto[]> {
    const request: ListBelvoAccountsRequestDto = { linkId };
    return this.accountsService.listAllBelvoBankAccountsByLinkId(request);
  }
}
