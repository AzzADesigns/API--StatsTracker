import { Injectable } from '@nestjs/common';
import { EventsService, EventEntity } from '../events/events.service';

@Injectable()
export class StatsService {
  constructor(private readonly eventsService: EventsService) {}

  totalEvents(): { total: number } {
    return { total: this.eventsService.findAll().length };
  }

  averageValue(): { average: number; count: number } {
    const events = this.eventsService.findAll();
    if (events.length === 0) return { average: 0, count: 0 };
    const sum = events.reduce((acc, e) => acc + (Number(e.value) || 0), 0);
    return { average: sum / events.length, count: events.length };
  }

  userRanking(): { ranking: Array<{ userId: number; events: number }> } {
    const events = this.eventsService.findAll();
    const countByUser = new Map<number, number>();
    for (const e of events) {
      countByUser.set(e.userId, (countByUser.get(e.userId) || 0) + 1);
    }
    const ranking = Array.from(countByUser.entries())
      .map(([userId, events]) => ({ userId, events }))
      .sort((a, b) => b.events - a.events);
    return { ranking };
  }
}
