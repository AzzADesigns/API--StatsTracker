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

## Cómo Ejecutar este Proyecto

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```
2.  **Iniciar el servidor en modo de desarrollo:**
    ```bash
    npm run start:dev
    ```
3.  La API estará disponible en `http://localhost:3000`.
4.  La documentación interactiva de Swagger se encuentra en `http://localhost:3000/api`.
