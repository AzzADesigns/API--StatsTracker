/*
 * 📊 MODELO DE DATOS - EVENTO
 * 
 * Este archivo define la estructura de un "Evento" en la base de datos.
 * No necesitas entender los decoradores (@Entity, @Column, etc.), solo saber que
 * cada propiedad se convierte en una columna en la tabla de PostgreSQL.
 */

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
