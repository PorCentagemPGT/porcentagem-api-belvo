import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WidgetService } from './widget.service';
import { WidgetTokenResponseDto } from './dto';

@ApiTags('Belvo Widget')
@Controller('widget')
export class WidgetController {
  constructor(private readonly widgetService: WidgetService) {}

  @Get('token')
  @ApiOperation({
    summary: 'Gerar token para o widget do Belvo',
    description:
      'Gera um token de acesso para o widget do Belvo que permite a conexão com instituições financeiras',
  })
  @ApiResponse({
    status: 200,
    description: 'Token gerado com sucesso',
    type: WidgetTokenResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro ao gerar token',
  })
  async getWidgetToken(): Promise<WidgetTokenResponseDto> {
    return this.widgetService.getWidgetToken();
  }
}
