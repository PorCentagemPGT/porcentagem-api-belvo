import { ApiProperty } from '@nestjs/swagger';

export class BelvoAccountDto {
  @ApiProperty({ description: 'ID da conta' })
  id: string;

  @ApiProperty({ description: 'ID do usuário' })
  userId: string;

  @ApiProperty({ description: 'ID do link no Belvo' })
  linkId: string;

  @ApiProperty({ description: 'Nome da instituição financeira' })
  institutionName: string;

  @ApiProperty({ description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt: Date;
}
