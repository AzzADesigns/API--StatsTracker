import { Injectable, NotFoundException } from '@nestjs/common';

export interface EventEntity {
  id: number;
  type: string;
  value: number;
  date: string | Date;
  userId: number;
}

export interface CreateEventInput {
  type: string;
  value: number;
  date: string | Date;
  userId: number;
}

export interface UpdateEventInput {
  type?: string;
  value?: number;
  date?: string | Date;
  userId?: number;
}

@Injectable()
export class EventsService {
  private events: EventEntity[] = [];
  private nextId = 1;

  findAll(): EventEntity[] {
    return this.events;
  }

  findOne(id: number): EventEntity {
    const found = this.events.find((e) => e.id === id);
    if (!found) throw new NotFoundException(`Evento ${id} no encontrado`);
    return found;
  }

  create(data: CreateEventInput): EventEntity {
    const newEvent: EventEntity = {
      id: this.nextId++,
      ...data,
    };
    this.events.push(newEvent);
    return newEvent;
  }

  update(id: number, data: UpdateEventInput): EventEntity {
    const idx = this.events.findIndex((e) => e.id === id);
    if (idx === -1) throw new NotFoundException(`Evento ${id} no encontrado`);
    const updated: EventEntity = { ...this.events[idx], ...data };
    this.events[idx] = updated;
    return updated;
  }

  remove(id: number): void {
    const idx = this.events.findIndex((e) => e.id === id);
    if (idx === -1) throw new NotFoundException(`Evento ${id} no encontrado`);
    this.events.splice(idx, 1);
  }

}