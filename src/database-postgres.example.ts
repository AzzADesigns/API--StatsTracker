/*
 * 🚀 CONFIGURACIÓN POSTGRESQL - LISTO PARA USAR
 * 
 * ¿Quieres conectar tu API a PostgreSQL? ¡Perfecto! Solo sigue estos pasos:
 * 
 * 1️⃣ INSTALA: npm install @nestjs/typeorm typeorm pg
 * 2️⃣ RENOMBRA: este archivo a 'database-postgres.ts'
 * 3️⃣ CAMBIA: en app.module.ts la importación a './database-postgres'
 * 4️⃣ ACTUALIZA: events.module.ts (ver instrucciones abajo)
 * 5️⃣ ¡LISTO! El servicio ya está preparado para PostgreSQL
 * 
 * ¡Y listo! Tu API usará PostgreSQL. Los datos se guardarán permanentemente.
 */

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Event } from './events/event.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password', // ⚠️ Cambia esta contraseña por la tuya
  database: 'statstracker',
  entities: [Event],
  synchronize: true, // Solo para desarrollo - crea tablas automáticamente
  logging: true, // Muestra las consultas SQL en la consola
};

/*
 * 📋 INSTRUCCIONES DETALLADAS PASO A PASO
 * 
 * PASO 4: Actualizar events.module.ts
 * Abre src/events/events.module.ts y cámbialo por esto:
 * 
 * ```typescript
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
 * ```
 * 
 * PASO 5: Actualizar events.service.ts (Opcional)
 * - Abre src/events/events.service.ts
 * - Reemplaza todo el código con la versión comentada al final del archivo
 * - ¡Y listo! Tu API usará PostgreSQL
 * 
 * PASO 6: Actualizar app.module.ts
 * Reemplaza TODO el contenido de src/app.module.ts por esto:
 * 
 * ```typescript
 * import { Module } from '@nestjs/common';
 * import { TypeOrmModule } from '@nestjs/typeorm';
 * import { databaseConfig } from './database-postgres';
 * import { EventsModule } from './events/events.module';
 * import { StatsModule } from './stats/stats.module';
 * 
 * @Module({
 *   imports: [
 *     TypeOrmModule.forRoot(databaseConfig),
 *     EventsModule,
 *     StatsModule,
 *   ],
 *   controllers: [],
 *   providers: [],
 * })
 * export class AppModule {}
 * ```
 */

/*
 * 🔧 CONFIGURACIÓN OPCIONAL (.env)
 * 
 * Si quieres usar variables de entorno (recomendado), crea un archivo .env en la raíz:
 * 
 * DB_HOST=localhost
 * DB_PORT=5432
 * DB_USERNAME=postgres
 * DB_PASSWORD=tu_password_aqui
 * DB_NAME=statstracker
 * 
 * Y cambia la configuración de arriba por:
 * 
 * host: process.env.DB_HOST || 'localhost',
 * port: parseInt(process.env.DB_PORT) || 5432,
 * username: process.env.DB_USERNAME || 'postgres',
 * password: process.env.DB_PASSWORD || 'password',
 * database: process.env.DB_NAME || 'statstracker',
 */