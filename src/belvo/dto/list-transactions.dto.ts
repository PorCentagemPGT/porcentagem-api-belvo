import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class ListTransactionsRequestDto {
  @ApiProperty({
    description: 'ID do link da conta no Belvo',
    example: 'link_123',
  })
  @IsString()
  @IsNotEmpty()
  linkId: string;

  @ApiProperty({
    description: 'Data de início para filtrar transações',
    example: '2025-01-01',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  dateFrom?: string;

  @ApiProperty({
    description: 'Data de fim para filtrar transações',
    example: '2025-12-31',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  dateTo?: string;
}

export class TransactionCategoryDto {
  @ApiProperty({
    description: 'Categoria principal da transação',
    example: 'Alimentação',
  })
  primary: string;

  @ApiProperty({
    description: 'Subcategoria da transação',
    example: 'Restaurante',
  })
  detailed: string;
}

export class ListTransactionsResponseDto {
  @ApiProperty({
    description: 'ID da transação no Belvo',
    example: 'txn_123',
  })
  id: string;

  @ApiProperty({
    description: 'ID da conta associada à transação',
    example: 'acc_123',
  })
  account: string;

  @ApiProperty({
    description: 'ID do link associado à transação',
    example: 'link_123',
  })
  link: string;

  @ApiProperty({
    description: 'Valor da transação',
    example: -50.0,
  })
  amount: number;

  @ApiProperty({
    description: 'Saldo após a transação',
    example: 950.0,
  })
  balance: number;

  @ApiProperty({
    description: 'Status da transação',
    example: 'COMPLETED',
  })
  status: string;

  @ApiProperty({
    description: 'Tipo da transação',
    example: 'OUTFLOW',
  })
  type: string;

  @ApiProperty({
    description: 'Categoria da transação',
    type: TransactionCategoryDto,
  })
  category: TransactionCategoryDto;

  @ApiProperty({
    description: 'Descrição da transação',
    example: 'PAGAMENTO CARTAO CREDITO',
  })
  description: string;

  @ApiProperty({
    description: 'Data da transação',
    example: '2025-05-21T12:00:00Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Data de coleta da transação',
    example: '2025-05-21T12:00:00Z',
  })
  collectedAt: string;

  @ApiProperty({
    description: 'Moeda da transação',
    example: 'BRL',
  })
  currency: string;

  @ApiProperty({
    description: 'Referência da transação',
    example: 'REF123',
  })
  reference: string;

  constructor(partial: Partial<ListTransactionsResponseDto>) {
    Object.assign(this, partial);
  }
}
