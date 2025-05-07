import { Module } from '@nestjs/common';
import { BelvoService } from './belvo.service';
import { BelvoController } from './belvo.controller';

@Module({
  controllers: [BelvoController],
  providers: [BelvoService],
  exports: [BelvoService],
})
export class BelvoModule {}
