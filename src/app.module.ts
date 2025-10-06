import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [EventsModule, StatsModule],
})
export class AppModule {}


{/*
  
      // src/app.module.ts
    import { Module } from '@nestjs/common';
    import { TypeOrmModule } from '@nestjs/typeorm';
    import { databaseConfig } from './database-postgres';
    import { EventsModule } from './events/events.module';
    import { StatsModule } from './stats/stats.module';

    @Module({
      imports: [
        TypeOrmModule.forRoot(databaseConfig),
        EventsModule,
        StatsModule,
      ],
      controllers: [],
      providers: [],
    })
    export class AppModule {}
    ```

### Paso 3: Preparar el Módulo de Eventos

Ahora, le diremos al `EventsModule` que la entidad `Event` existe y que debe estar disponible para inyección.

-   Abre `src/events/events.module.ts`.
-   Reemplaza TODO el contenido con esto:

```typescript
// src/events/events.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
```

### Paso 4: Actualizar el Servicio (Opcional)

**Por defecto, tu API funciona perfectamente en memoria.** No necesitas cambiar nada más.

**Si quieres escalar a PostgreSQL:**
- Abre `src/events/events.service.ts`
- Reemplaza todo el código con la versión comentada al final del archivo
- ¡Y listo! Tu API usará PostgreSQL

### ¿Qué acabas de hacer?

1.  Has configurado una conexión a una base de datos PostgreSQL.
2.  Has transformado la lógica de negocio para que sea persistente.
3.  Has aprendido el flujo para integrar una nueva entidad y un repositorio de TypeORM en un módulo de NestJS.

La próxima vez que inicies la aplicación con `npm run start:dev`, tu API se conectará a PostgreSQL y creará automáticamente las tablas necesarias. Todos los eventos que crees a través de la API se guardarán permanentemente y sobrevivirán a los reinicios del servidor.
  
  
  */}