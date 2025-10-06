import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StatsService } from './stats.service';

@ApiTags('stats')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('total')
  @ApiOperation({ summary: 'Total de eventos' })
  @ApiOkResponse({ description: 'Total de eventos registrados' })
  total() {
    return this.statsService.totalEvents();
  }

  @Get('average-value')
  @ApiOperation({ summary: 'Promedio del campo value' })
  @ApiOkResponse({ description: 'Promedio del valor de los eventos' })
  averageValue() {
    return this.statsService.averageValue();
  }

  @Get('ranking')
  @ApiOperation({ summary: 'Ranking de usuarios por cantidad de eventos' })
  @ApiOkResponse({ description: 'Ranking de usuarios' })
  ranking() {
    return this.statsService.userRanking();
  }
}

