import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { ListAccountsRequestDto, ListAccountsResponseDto } from './dto';

@ApiTags('Bank Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
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
  async listAllBelvoBankAccounts(
    @Query() data: ListAccountsRequestDto,
  ): Promise<ListAccountsResponseDto[]> {
    return await this.accountsService.listAllBelvoBankAccountsByLinkId(data);
  }
}
