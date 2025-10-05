import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [EventsModule, StatsModule],
})
export class AppModule {}
