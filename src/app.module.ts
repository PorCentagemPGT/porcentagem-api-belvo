import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BelvoModule } from './belvo/belvo.module';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { WidgetModule } from './widget/widget.module';
import { DatabaseModule } from './database/database.module';
import * as path from 'path';

@Module({
  imports: [
    AccountsModule,
    TransactionsModule,
    WidgetModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(process.cwd(), '.env'),
      cache: false,
      validate: (config: Record<string, unknown>) => {
        const required = ['BELVO_ID', 'BELVO_PASSWORD', 'DATABASE_URL'];
        const missing = required.filter((key) => !config[key]);

        if (missing.length > 0) {
          throw new Error(
            `Missing required environment variables: ${missing.join(', ')}`,
          );
        }
        return config;
      },
    }),
    BelvoModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
