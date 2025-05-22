import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ListAccountsRequestDto {
  @ApiProperty({
    description: 'ID do link da conta no Belvo',
    example: 'link_123',
  })
  @IsString()
  @IsNotEmpty()
  linkId: string;
}

export class ListAccountsResponseDto {
  @ApiProperty({
    description: 'ID da conta no Belvo',
    example: 'acc_123',
  })
  id: string;

  @ApiProperty({
    description: 'ID do link associado à conta',
    example: 'link_123',
  })
  link: string;

  @ApiProperty({
    description: 'Nome da instituição financeira',
    example: 'nubank',
  })
  institution: string;

  @ApiProperty({
    description: 'Categoria da conta',
    example: 'checking',
  })
  category: string;

  @ApiProperty({
    description: 'Tipo da conta',
    example: 'checking',
  })
  type: string;

  @ApiProperty({
    description: 'Número da conta',
    example: '123456789',
  })
  number: string;

  @ApiProperty({
    description: 'Nome da conta',
    example: 'Conta Corrente',
  })
  name: string;

  @ApiProperty({
    description: 'Moeda da conta',
    example: 'BRL',
  })
  currency: string;

  @ApiProperty({
    description: 'Identificação pública da conta',
    example: { type: 'AGENCY_NUMBER', value: '0001' },
  })
  publicIdentification?: {
    type: string;
    value: string;
  };

  @ApiProperty({
    description: 'Saldo da conta',
    example: { current: 1000.0, available: 900.0 },
  })
  balance: {
    current: number;
    available: number;
  };

  @ApiProperty({
    description: 'Data da última coleta de dados',
    example: '2025-05-21T12:00:00Z',
  })
  collectedAt: string;

  @ApiProperty({
    description: 'Data de criação da conta no Belvo',
    example: '2025-05-21T12:00:00Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Data do último acesso à conta',
    example: '2025-05-21T12:00:00Z',
  })
  lastAccessedAt: string;

  constructor(partial: Partial<ListAccountsResponseDto>) {
    Object.assign(this, partial);
  }
}
