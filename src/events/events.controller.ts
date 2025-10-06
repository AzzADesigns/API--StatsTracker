import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from '../common/zod-validation.pipe';
import { EventsService } from './events.service';
import { createEventSchema, updateEventSchema } from './events.schemas';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los eventos' })
  @ApiOkResponse({ description: 'Lista de eventos', schema: { type: 'array', items: { $ref: '#/components/schemas/Event' } } })
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un evento por id' })
  @ApiOkResponse({ description: 'Evento encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo evento' })
  @ApiBody({ schema: { type: 'object', properties: { type: { type: 'string' }, value: { type: 'number' }, date: { anyOf: [{ type: 'string' }, { type: 'string', format: 'date-time' }] }, userId: { type: 'integer' } }, required: ['type', 'value', 'date', 'userId'] } })
  create(@Body(new ZodValidationPipe(createEventSchema)) body: any) {
    return this.eventsService.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un evento' })
  @ApiBody({ schema: { type: 'object', properties: { type: { type: 'string' }, value: { type: 'number' }, date: { anyOf: [{ type: 'string' }, { type: 'string', format: 'date-time' }] }, userId: { type: 'integer' } } } })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateEventSchema)) body: any,
  ) {
    return this.eventsService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un evento' })
  @ApiOkResponse({ description: 'Evento eliminado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    this.eventsService.remove(id);
    return { message: `Evento ${id} eliminado` };
  }
}

