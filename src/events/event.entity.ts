import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  type: string;

  @Column({ type: 'float' })
  value: number;

  @Column({ type: 'datetime' })
  date: Date;

  @Column({ type: 'integer' })
  userId: number;
}
