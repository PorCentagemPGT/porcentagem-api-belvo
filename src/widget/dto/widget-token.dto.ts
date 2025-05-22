import { ApiProperty } from '@nestjs/swagger';

export class WidgetTokenResponseDto {
  @ApiProperty({
    description: 'Token de acesso para o widget do Belvo',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access: string;

  @ApiProperty({
    description: 'Tempo de expiração do token em segundos',
    example: 3600,
  })
  expiresIn: number;

  constructor(partial: Partial<WidgetTokenResponseDto>) {
    Object.assign(this, partial);
  }
}
