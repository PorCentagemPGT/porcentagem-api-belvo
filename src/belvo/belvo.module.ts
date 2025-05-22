import { Module } from '@nestjs/common';
import { BelvoService } from './belvo.service';

@Module({
  providers: [BelvoService],
  exports: [BelvoService],
})
export class BelvoModule {}
