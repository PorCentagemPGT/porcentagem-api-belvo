import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BelvoModule } from './belvo/belvo.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(process.cwd(), '.env'),
      cache: false,
      validate: (config: Record<string, unknown>) => {
        const required = ['BELVO_ID', 'BELVO_PASSWORD'];
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
