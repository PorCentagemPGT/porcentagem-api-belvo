import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class ListTransactionsRequestDto {
  @ApiProperty({
    description: 'ID do link no Belvo',
    example: 'f9beb63c-e385-4cc2-899c-36976990faf1',
  })
  @IsNotEmpty()
  @IsString()
  linkId: string;

  @ApiProperty({
    description: 'Data inicial para filtrar transações',
    example: '2025-01-01',
    required: false,
  })
  @IsOptional()
  @IsString()
  dateFrom?: string;

  @ApiProperty({
    description: 'Data final para filtrar transações',
    example: '2025-12-31',
    required: false,
  })
  @IsOptional()
  @IsString()
  dateTo?: string;
}

export class ListTransactionsResponseDto {
  @ApiProperty({
    description: 'ID da transação no Belvo',
  })
  id: string;

  @ApiProperty({
    description: 'ID da conta no Belvo',
  })
  account: string;

  @ApiProperty({
    description: 'ID do link no Belvo',
  })
  link: string;

  @ApiProperty({
    description: 'Valor da transação',
  })
  amount: number;

  @ApiProperty({
    description: 'Status da transação',
  })
  status: string;

  @ApiProperty({
    description: 'Tipo da transação',
  })
  type: string;

  @ApiProperty({
    description: 'Categoria da transação',
  })
  category: {
    primary: string;
    detailed: string;
  };

  @ApiProperty({
    description: 'Descrição da transação',
  })
  description: string;

  @ApiProperty({
    description: 'Data de criação da transação',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Moeda da transação',
  })
  currency: string;

  constructor(partial: Partial<ListTransactionsResponseDto>) {
    Object.assign(this, partial);
  }
}
