import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SaveAccountRequestDto {
  @ApiProperty({
    description: 'ID do link no Belvo',
    example: 'f9beb63c-e385-4cc2-899c-36976990faf1',
  })
  @IsNotEmpty()
  @IsString()
  linkId: string;

  @ApiProperty({
    description: 'ID da conta no Belvo',
    example: '83661d45-e9bf-4c9d-ba0b-26b04af53708',
  })
  @IsNotEmpty()
  @IsString()
  accountId: string;

  @ApiProperty({
    description: 'Nome da instituição financeira',
    example: 'erebor_br_retail',
  })
  @IsNotEmpty()
  @IsString()
  institution: string;

  @ApiProperty({
    description: 'Categoria da conta',
    example: 'PENSION_FUND_ACCOUNT',
  })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({
    description: 'Tipo específico da conta',
    example: 'REGRESSIVA',
  })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Nome da conta',
    example: 'PREV CONVENIOS VGBL',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class SaveAccountResponseDto {
  @ApiProperty({
    description: 'ID interno da conta salva',
  })
  id: string;

  @ApiProperty({
    description: 'Data de criação do registro',
  })
  createdAt: Date;
}
