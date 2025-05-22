import { Module } from '@nestjs/common';
import { WidgetController } from './widget.controller';
import { WidgetService } from './widget.service';
import { BelvoModule } from '../belvo/belvo.module';

@Module({
  imports: [BelvoModule],
  controllers: [WidgetController],
  providers: [WidgetService],
})
export class WidgetModule {}
