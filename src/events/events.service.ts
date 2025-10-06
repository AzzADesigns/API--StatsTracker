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

  /*
   * 🚀 VERSIÓN PARA POSTGRESQL - DESCOMENTAR CUANDO QUIERAS ESCALAR
   * 
   * Para usar PostgreSQL, reemplaza TODO el código de arriba con esto:
   * 
   * import { Injectable, NotFoundException } from '@nestjs/common';
   * import { InjectRepository } from '@nestjs/typeorm';
   * import { Repository } from 'typeorm';
   * import { Event } from './event.entity';
   * import { CreateEventDto, UpdateEventDto } from './events.schemas';
   * 
   * @Injectable()
   * export class EventsService {
   *   constructor(
   *     @InjectRepository(Event)
   *     private readonly eventsRepository: Repository<Event>,
   *   ) {}
   * 
   *   async findAll(): Promise<Event[]> {
   *     return this.eventsRepository.find();
   *   }
   * 
   *   async findOne(id: number): Promise<Event> {
   *     const found = await this.eventsRepository.findOne({ where: { id } });
   *     if (!found) throw new NotFoundException(`Evento ${id} no encontrado`);
   *     return found;
   *   }
   * 
   *   async create(data: CreateEventDto): Promise<Event> {
   *     const newEvent = this.eventsRepository.create(data);
   *     return this.eventsRepository.save(newEvent);
   *   }
   * 
   *   async update(id: number, data: UpdateEventDto): Promise<Event> {
   *     const eventToUpdate = await this.eventsRepository.preload({
   *       id: id,
   *       ...data,
   *     });
   *     if (!eventToUpdate) throw new NotFoundException(`Evento ${id} no encontrado`);
   *     return this.eventsRepository.save(eventToUpdate);
   *   }
   * 
   *   async remove(id: number): Promise<void> {
   *     const result = await this.eventsRepository.delete(id);
   *     if (result.affected === 0) throw new NotFoundException(`Evento ${id} no encontrado`);
   *   }
   * }
   */
}