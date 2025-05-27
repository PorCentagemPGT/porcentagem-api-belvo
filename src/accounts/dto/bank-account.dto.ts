import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BankAccountRequestDto {
  @ApiProperty({ description: 'ID do link no Belvo' })
  @IsNotEmpty()
  @IsString()
  linkId: string;

  @ApiProperty({ description: 'ID da conta no Belvo' })
  @IsNotEmpty()
  @IsString()
  bankAccountId: string;

  @ApiProperty({ description: 'ID do usuário' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Categoria da conta (ex: CREDIT_CARD)' })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({ description: 'Tipo da conta (ex: Contas)' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({ description: 'Número da conta (ex: 4835 None5744)' })
  @IsNotEmpty()
  @IsString()
  number: string;

  @ApiProperty({ description: 'Nome da conta (ex: Cartão crédito visa gold)' })
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class BankAccountResponseDto {
  @ApiProperty({ description: 'ID do link no Belvo' })
  linkId: string;

  @ApiProperty({ description: 'ID da conta no Belvo' })
  bankAccountId: string;

  @ApiProperty({ description: 'ID do usuário' })
  userId: string;

  @ApiProperty({ description: 'Categoria da conta (ex: CREDIT_CARD)' })
  category: string;

  @ApiProperty({ description: 'Tipo da conta (ex: Contas)' })
  type: string;

  @ApiProperty({ description: 'Número da conta (ex: 4835 None5744)' })
  number: string;

  @ApiProperty({ description: 'Nome da conta (ex: Cartão crédito visa gold)' })
  name: string;

  @ApiProperty({ description: 'Status da conta (enabled/disabled)' })
  status: string;

  @ApiProperty({ description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt: Date;
}
