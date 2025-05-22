import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { BelvoModule } from '../belvo/belvo.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [BelvoModule, DatabaseModule],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
