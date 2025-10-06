import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}

{/*
  * import { Module } from '@nestjs/common';
 * import { TypeOrmModule } from '@nestjs/typeorm';
 * import { Event } from './event.entity';
 * import { EventsService } from './events.service';
 * import { EventsController } from './events.controller';
 * 
 * @Module({
 *   imports: [TypeOrmModule.forFeature([Event])],
 *   controllers: [EventsController],
 *   providers: [EventsService],
 *   exports: [EventsService],
 * })
 * export class EventsModule {}
  
  
  */}