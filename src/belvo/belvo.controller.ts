import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BelvoService } from './belvo.service';
import {
  WidgetTokenResponseDto,
  WidgetTokenErrorResponseDto,
  LinkAccountRequestDto,
  LinkAccountResponseDto,
  ListAccountsRequestDto,
  ListAccountsResponseDto,
  ListTransactionsRequestDto,
  ListTransactionsResponseDto,
} from './dto';

@ApiTags('Belvo Integration')
@Controller('belvo')
export class BelvoController {
  constructor(private readonly belvoService: BelvoService) {}

  @Get('widget-token')
  @ApiOperation({
    summary: 'Gerar token para o widget Belvo',
    description: 'Gera um token JWT para autenticação com o widget Belvo',
  })
  @ApiResponse({
    status: 200,
    description: 'Token gerado com sucesso',
    type: WidgetTokenResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Erro de autenticação com a API Belvo',
    type: WidgetTokenErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno ao gerar o token',
    type: WidgetTokenErrorResponseDto,
  })
  async getWidgetToken(): Promise<WidgetTokenResponseDto> {
    const token = await this.belvoService.generateWidgetToken();
    return new WidgetTokenResponseDto(token);
  }

  @Post('link-account')
  @ApiOperation({
    summary: 'Vincular conta bancária',
    description: 'Vincula uma conta bancária ao usuário usando o Belvo',
  })
  @ApiResponse({
    status: 201,
    description: 'Conta vinculada com sucesso',
    type: LinkAccountResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Link não encontrado no Belvo',
    type: WidgetTokenErrorResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Link já registrado para outro usuário',
    type: WidgetTokenErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno ao vincular conta',
    type: WidgetTokenErrorResponseDto,
  })
  async linkAccount(
    @Body() data: LinkAccountRequestDto,
  ): Promise<LinkAccountResponseDto> {
    return this.belvoService.linkAccount(data);
  }

  @Get('accounts')
  @ApiOperation({
    summary: 'Listar contas bancárias',
    description:
      'Lista todas as contas bancárias vinculadas a um link específico',
  })
  @ApiResponse({
    status: 200,
    description: 'Contas listadas com sucesso',
    type: [ListAccountsResponseDto],
  })
  @ApiResponse({
    status: 404,
    description: 'Link não encontrado',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno ao listar contas',
  })
  async listAccounts(
    @Query() data: ListAccountsRequestDto,
  ): Promise<ListAccountsResponseDto[]> {
    return this.belvoService.listAccounts(data);
  }

  @Get('transactions')
  @ApiOperation({
    summary: 'Listar transações bancárias',
    description:
      'Lista todas as transações bancárias de um link específico, com opção de filtro por data',
  })
  @ApiResponse({
    status: 200,
    description: 'Transações listadas com sucesso',
    type: [ListTransactionsResponseDto],
  })
  @ApiResponse({
    status: 404,
    description: 'Link não encontrado',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno ao listar transações',
  })
  async listTransactions(
    @Query() data: ListTransactionsRequestDto,
  ): Promise<ListTransactionsResponseDto[]> {
    return this.belvoService.listTransactions(data);
  }
}
