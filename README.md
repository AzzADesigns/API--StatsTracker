# StatsTracker API

Bienvenido a StatsTracker API, un backend versátil y ligero construido con NestJS, diseñado para registrar y analizar eventos a lo largo del tiempo.

El núcleo de esta API es su capacidad para actuar como una "bitácora universal", permitiendo a cualquier aplicación frontend o servicio registrar sucesos y luego obtener estadísticas significativas a partir de ellos.

## Conceptos Clave

La API gira en torno a un único recurso principal: el **Evento**. Un evento es un registro inmutable de algo que sucedió en un momento específico y tiene la siguiente estructura:

- `id` (number): Un identificador único para el evento.
- `type` (string): Una cadena de texto que describe el tipo de evento que ocurrió.
- `value` (number): Un valor numérico asociado al evento.
- `date` (string | Date): La fecha y hora en que ocurrió el evento.
- `userId` (number): El identificador de la entidad (usuario, dispositivo, etc.) asociada al evento.

## Endpoints de la API

La API expone dos grupos principales de endpoints:

1.  **/events**: Permite una gestión CRUD completa sobre los eventos.
    - `GET /events`: Lista todos los eventos registrados.
    - `GET /events/:id`: Obtiene un evento específico.
    - `POST /events`: Crea un nuevo evento.
    - `PUT /events/:id`: Actualiza un evento existente.
    - `DELETE /events/:id`: Elimina un evento.

2.  **/stats**: Expone métricas calculadas a partir de todos los eventos.
    - `GET /stats/total`: Devuelve el número total de eventos registrados.
    - `GET /stats/average-value`: Devuelve el promedio de los campos `value` de todos los eventos.
    - `GET /stats/ranking`: Devuelve un ranking de `userId` basado en la cantidad de eventos que han registrado.

---

## Caso de Uso conceptual: "Mi Progreso Académico"

Para demostrar la flexibilidad de esta API, imaginemos que un desarrollador frontend la utiliza para construir una aplicación llamada **"Mi Progreso Académico"**. El objetivo de esta app es ayudar a un estudiante a registrar y analizar su rendimiento escolar.

### Concepto de la Aplicación Frontend

La aplicación permite al estudiante registrar notas de exámenes, tareas, proyectos y sus sesiones de estudio. Luego, le presenta un dashboard con estadísticas sobre su progreso.

### Adaptación del Modelo de Eventos

Así es como los conceptos de la aplicación se mapean a la estructura de la API:

- **`userId`**: Representa el `id` del estudiante.
- **`type`**: Se usa una cadena compuesta `actividad_materia` para dar contexto. Ejemplos:
    - `examen_matematicas`
    - `tarea_historia`
    - `estudio_ciencias`
- **`value`**: Es un campo flexible que representa:
    - La **calificación** obtenida si el tipo es `examen`, `tarea` o `proyecto`.
    - Los **minutos dedicados** si el tipo es `estudio`.

### Flujo de Trabajo de Ejemplo

1.  **El estudiante recibe una nota.**
    - El estudiante saca un **85** en su examen de **Matemáticas**.
    - En la UI de la aplicación, introduce estos datos.
    - El frontend envía la siguiente petición a la API:

    **Request:**
    ```http
    POST /events
    Content-Type: application/json

    {
      "type": "examen_matematicas",
      "value": 85,
      "date": "2025-11-15T10:00:00.000Z",
      "userId": 1
    }
    ```

2.  **El estudiante registra una sesión de estudio.**
    - El estudiante estudia **Ciencias** durante **90 minutos**.
    - El frontend envía la siguiente petición:

    **Request:**
    ```http
    POST /events
    Content-Type: application/json

    {
      "type": "estudio_ciencias",
      "value": 90,
      "date": "2025-11-15T18:30:00.000Z",
      "userId": 1
    }
    ```

### Potenciando el Dashboard con la API

Con los datos registrados, el frontend puede construir un dashboard de "Progreso Académico" muy potente y útil:

- **Calificación Promedio por Materia:**
  - El frontend puede llamar a `GET /events`.
  - Luego, filtra los resultados por `type` para cada materia (ej: todos los que empiezan con `examen_` y `tarea_`).
  - Calcula el promedio de los `value` para obtener la nota media en Matemáticas, Historia, etc.
  - **Insight para el estudiante:** Identifica al instante en qué materias necesita mejorar.

- **Tiempo de Estudio vs. Rendimiento:**
  - El frontend puede obtener todos los eventos de `estudio_` y sumarlos para mostrar el tiempo total dedicado a cada materia.
  - Puede cruzar esta información con la calificación promedio para responder: *"¿Estoy dedicando suficiente tiempo a las materias donde tengo notas más bajas?"*.

- **Actividad Reciente:**
  - La sección principal del dashboard puede mostrar los últimos eventos registrados (últimas notas, últimas sesiones de estudio) llamando a `GET /events` y mostrando los resultados más recientes.

Este ejemplo demuestra cómo la API, con su estructura genérica, puede ser la base para una aplicación especializada, útil y destacable, sin necesidad de modificar el backend.

## 📁 Mapa del Proyecto

Para que sepas exactamente dónde encontrar todo lo que necesitas:

### 🚀 **Para escalar a PostgreSQL:**
- **`GUIA_POSTGRESQL_COMPLETA.txt`** - Guía completa paso a paso con todo el código
- **`src/database-postgres.example.ts`** - Archivo de configuración (renombrar a `database-postgres.ts`)

### 🎯 **Archivos principales (no modificar):**
- **`src/app.module.ts`** - Configuración principal de la app
- **`src/events/events.module.ts`** - Configuración del módulo de eventos
- **`src/events/events.controller.ts`** - Endpoints de la API
- **`src/events/events.service.ts`** - Servicio de eventos (funciona en memoria por defecto)
- **`src/events/event.entity.ts`** - Modelo de datos para PostgreSQL
- **`src/stats/`** - Módulo de estadísticas

**💡 Tip:** Todo lo que necesitas para PostgreSQL está en `GUIA_POSTGRESQL_COMPLETA.txt`

## 🚀 Escalando a PostgreSQL

Por defecto, este proyecto funciona con datos "en memoria", lo que significa que cada vez que reinicias el servidor, todos los eventos que creaste se borran. Esto es ideal para pruebas rápidas, pero no para una aplicación real.

**¿Quieres conectar tu API a PostgreSQL para guardar datos permanentemente?**

📄 **Sigue la guía completa:** `GUIA_POSTGRESQL_COMPLETA.txt`

Esta guía incluye:
- ✅ Instalación de PostgreSQL
- ✅ Configuración paso a paso
- ✅ Código listo para copiar y pegar
- ✅ Solución de problemas comunes
- ✅ Variables de entorno opcionales

**💡 Todo está en un solo archivo - no necesitas buscar en múltiples lugares.**

## Cómo Ejecutar y Probar la API (Guía para Frontend)

Esta guía te llevará paso a paso para iniciar el backend y explorarlo por primera vez, incluso si no tienes experiencia con NestJS o Swagger.

### Paso 1: Iniciar el Servidor Backend

Primero, necesitamos que el servidor de la API esté funcionando en tu máquina.

1.  **Instalar dependencias:** Abre una terminal en la carpeta del proyecto y ejecuta:
    ```bash
    npm install
    ```
2.  **Iniciar el servidor en modo de desarrollo:** Una vez terminada la instalación, ejecuta:
    ```bash
    npm run start:dev
    ```
    Este comando compila el proyecto y levanta un servidor local que se reinicia automáticamente si haces cambios en el código. Verás un mensaje indicando que la aplicación se ha iniciado correctamente.

### Paso 2: Descubrir la API con Swagger

**¿Qué es Swagger?** Imagina que es un **menú interactivo y un campo de pruebas para la API**, todo en una página web. Como desarrollador frontend, es tu mejor amigo: te permite ver todos los endpoints, qué datos necesitan y probarlos en tiempo real sin escribir una línea de `fetch` y sin usar herramientas como Postman.

1.  **Accede a la documentación:** Con el servidor corriendo, abre tu navegador web y ve a la siguiente URL:
    
    `http://localhost:3000/api`

    (El backend corre en `localhost:3000` y hemos configurado Swagger para que viva en la ruta `/api`).

2.  **Explora la interfaz:** Verás el título de la API y dos secciones: `events` y `stats`. Estos son los grupos de endpoints que puedes usar.

### Paso 3: Tu Primera Llamada a la API (sin código)

Vamos a hacer una llamada simple para ver el total de eventos.

1.  **Expande un endpoint:** Haz clic en la barra (usualmente azul o verde) de `GET /stats/total` para que se desplieguen los detalles.
2.  **Activa el modo de prueba:** Verás un botón a la derecha que dice **`Try it out`**. Haz clic en él.
3.  **Ejecuta la llamada:** El área se volverá editable, y aparecerá un botón azul grande que dice **`Execute`**. Haz clic en él.
4.  **Revisa la respuesta:** Justo debajo, verás la sección **`Server response`**. Te mostrará el código de respuesta (ej: `200`) y el cuerpo (`body`) de la respuesta real de la API, que será algo como `{"total": 0}`.

    *¡Felicidades! Acabas de hacer tu primera llamada a la API directamente desde el navegador.*

### Paso 4: Tu Segunda Llamada a la API (Creando Datos)

Ahora, vamos a crear un evento para ver cómo funciona una petición `POST`.

1.  **Expande el endpoint `POST /events`**.
2.  Haz clic en **`Try it out`**.
3.  **Modifica el cuerpo de la petición:** Verás un campo de texto llamado **`Request body`** con un ejemplo en formato JSON. Puedes editarlo. Por ejemplo, cambia el `value` a `95` y el `type` a `"examen_matematicas"`.
4.  Haz clic en **`Execute`**.
5.  **Revisa la respuesta:** La respuesta del servidor ahora te mostrará el evento completo que acabas de crear, incluyendo el `id` que le asignó el backend.

**Bonus:** Si ahora vuelves a ejecutar la prueba del `GET /stats/total` como en el paso 3, verás que la respuesta ha cambiado. Ahora dirá `{"total": 1}`. Esto demuestra que estás interactuando en tiempo real con la lógica del backend.

Con Swagger, puedes entender y probar cada rincón de la API antes de empezar a construir tu interfaz de usuario, haciendo tu trabajo mucho más fácil y rápido.

