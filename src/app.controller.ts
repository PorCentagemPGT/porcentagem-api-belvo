import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Health check endpoint',
    description: 'Verifica se a API está funcionando corretamente',
  })
  @ApiResponse({
    status: 200,
    description: 'API está funcionando normalmente',
    type: String,
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
