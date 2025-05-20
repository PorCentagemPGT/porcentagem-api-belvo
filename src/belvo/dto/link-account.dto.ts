import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LinkAccountRequestDto {
  @ApiProperty({
    description: 'ID do link retornado pelo widget do Belvo',
    example: 'abc123xyz',
  })
  @IsString()
  @IsNotEmpty()
  linkId: string;

  @ApiProperty({
    description: 'Nome da instituição financeira',
    example: 'Gringotts',
  })
  @IsString()
  @IsNotEmpty()
  institutionName: string;

  @ApiProperty({
    description: 'ID do usuário no sistema de autenticação',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class LinkAccountResponseDto {
  @ApiProperty({
    description: 'ID único da conta vinculada',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'ID do link retornado pelo widget do Belvo',
    example: 'abc123xyz',
  })
  linkId: string;

  @ApiProperty({
    description: 'Nome da instituição financeira',
    example: 'Gringotts',
  })
  institutionName: string;

  @ApiProperty({
    description: 'ID do usuário no sistema de autenticação',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  userId: string;

  @ApiProperty({
    description: 'Data de criação do registro',
    example: '2025-05-16T13:04:22.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do registro',
    example: '2025-05-16T13:04:22.000Z',
  })
  updatedAt: Date;
}
