import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [EventsModule, StatsModule],
})
export class AppModule {}


{/*
  ### Paso 1: Modificar AppModule para usar TypeORM

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


### Paso 2: Preparar el Módulo de Eventos

Ahora, a estas alturas , debes haber copiado lo que hay es database-postgres.example.ts
```

### Paso 3: Actualizar el Servicio (Opcional)

**Por defecto, tu API funciona perfectamente en memoria.** No necesitas cambiar nada más.

**Si quieres escalar a PostgreSQL:**
- Abre `src/events/events.service.ts`
- Reemplaza todo el código con la versión comentada al final del archivo
- ¡Y listo! Tu API usará PostgreSQL
  */}