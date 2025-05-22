import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { ListTransactionsRequestDto, ListTransactionsResponseDto } from './dto';

@ApiTags('Bank Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar transações bancárias',
    description:
      'Lista todas as transações bancárias vinculadas a um link específico',
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
    return this.transactionsService.listTransactions(data);
  }
}
