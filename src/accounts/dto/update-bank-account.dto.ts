/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AccountStatus } from '@prisma/client';

export class UpdateBankAccountDto {
  @ApiProperty({
    description: 'Nome da instituição financeira',
    required: false,
  })
  @IsOptional()
  @IsString()
  institutionName?: string;

  @ApiProperty({
    description: 'Status da conta bancária',
    required: false,
    enum: AccountStatus,
  })
  @IsOptional()
  @IsEnum(AccountStatus)
  status?: AccountStatus;
}
