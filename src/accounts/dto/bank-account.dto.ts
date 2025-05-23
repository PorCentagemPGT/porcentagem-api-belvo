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

  @ApiProperty({ description: 'Nome da instituição financeira' })
  @IsNotEmpty()
  @IsString()
  institutionName: string;
}

export class BankAccountResponseDto {
  @ApiProperty({ description: 'ID do link no Belvo' })
  linkId: string;

  @ApiProperty({ description: 'ID da conta no Belvo' })
  bankAccountId: string;

  @ApiProperty({ description: 'ID do usuário' })
  userId: string;

  @ApiProperty({ description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt: Date;
}
