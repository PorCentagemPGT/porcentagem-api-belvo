import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ListAccountsRequestDto {
  @ApiProperty({
    description: 'ID do link no Belvo',
    example: 'f9beb63c-e385-4cc2-899c-36976990faf1',
  })
  @IsNotEmpty()
  @IsString()
  linkId: string;

  @ApiProperty({
    description: 'ID do usuário',
    example: 'f9beb63c-e385-4cc2-899c-36976990faf1',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'ID da conta no Belvo',
    example: 'f9beb63c-e385-4cc2-899c-36976990faf1',
  })
  @IsNotEmpty()
  @IsString()
  bankAccountId: string;

  @ApiProperty({
    description: 'Nome da instituição',
    example: 'Banco do Brasil',
  })
  @IsNotEmpty()
  @IsString()
  institutionName: string;
}

export class ListAccountsResponseDto {
  @ApiProperty({
    description: 'ID da conta no Belvo',
  })
  id: string;

  @ApiProperty({
    description: 'ID do link no Belvo',
  })
  link: string;

  @ApiProperty({
    description: 'ID da conta no Belvo',
  })
  bankAccountId: string;

  @ApiProperty({
    description: 'Nome da instituição',
  })
  institution: string;

  @ApiProperty({
    description: 'Categoria da conta',
  })
  category: string;

  @ApiProperty({
    description: 'Tipo da conta',
  })
  type: string;

  @ApiProperty({
    description: 'Nome da conta',
  })
  name: string;

  constructor(partial: Partial<ListAccountsResponseDto>) {
    Object.assign(this, partial);
  }
}
