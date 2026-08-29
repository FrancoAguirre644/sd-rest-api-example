# Vehicles REST API

API REST desarrollada con **NestJS**, **TypeScript**, **TypeORM** y **MySQL** para la gestión de vehículos.

El proyecto implementa un CRUD completo de vehículos, búsqueda, eliminación lógica y documentación interactiva mediante Swagger/OpenAPI.

---

## Tecnologías

* [NestJS](https://nestjs.com/)
* TypeScript
* TypeORM
* MySQL
* Swagger / OpenAPI
* Node.js
* npm

---

## Funcionalidades

La API permite:

* Crear vehículos.
* Obtener todos los vehículos.
* Obtener un vehículo por ID.
* Actualizar vehículos.
* Desactivar vehículos mediante eliminación lógica.
* Buscar vehículos.
* Utilizar un enum para definir el tipo de vehículo.
* Manejar errores `400` y `404`.
* Documentar y probar la API mediante Swagger.

---

## Tipos de vehículos

Los vehículos pueden pertenecer a uno de los siguientes tipos:

```text
SEDAN
SUV
PICKUP
COUPE
HATCHBACK
MOTORCYCLE
```

---

## Requisitos

Antes de comenzar, necesitás tener instalado:

* Node.js
* npm
* MySQL

Podés verificar las versiones con:

```bash
node --version
npm --version
mysql --version
```

---

## Instalación

Clonar el repositorio:

```bash
git clone <repository-url>
```

Ingresar al proyecto:

```bash
cd rest-api-example
```

Instalar las dependencias:

```bash
npm install
```

---

## Configuración de MySQL

Crear una base de datos:

```sql
CREATE DATABASE vehicles_api;
```

Configurar las credenciales de conexión en el proyecto.

Por ejemplo:

```text
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=vehicles_api
```

> Las variables exactas dependen de la configuración utilizada en `TypeOrmModule`.

---

## Ejecutar el proyecto

Modo desarrollo:

```bash
npm run start:dev
```

La API estará disponible en:

```text
http://localhost:3000
```

Como la aplicación utiliza el prefijo global `api`, los endpoints están disponibles debajo de:

```text
http://localhost:3000/api
```

---

# Swagger

La API cuenta con documentación interactiva mediante Swagger/OpenAPI.

Una vez iniciada la aplicación, acceder a:

```text
http://localhost:3000/docs
```

Desde Swagger es posible:

* Consultar los endpoints.
* Ver los parámetros.
* Ver los DTOs.
* Ver los tipos de respuesta.
* Consultar los códigos de error.
* Ejecutar las peticiones directamente desde el navegador.

---

# Endpoints

## Crear un vehículo

```http
POST /api/vehicles
```

### Request

```json
{
  "licensePlate": "AB123CD",
  "brand": "Toyota",
  "model": "Corolla",
  "year": 2024,
  "color": "White",
  "type": "SEDAN"
}
```

### Response

```json
{
  "id": 1,
  "licensePlate": "AB123CD",
  "brand": "Toyota",
  "model": "Corolla",
  "year": 2024,
  "color": "White",
  "type": "SEDAN",
  "active": true
}
```

---

## Obtener todos los vehículos

```http
GET /api/vehicles
```

### Response

```json
[
  {
    "id": 1,
    "licensePlate": "AB123CD",
    "brand": "Toyota",
    "model": "Corolla",
    "year": 2024,
    "color": "White",
    "type": "SEDAN",
    "active": true
  }
]
```

---

## Obtener un vehículo

```http
GET /api/vehicles/:id
```

Ejemplo:

```http
GET /api/vehicles/1
```

### Vehículo inexistente

Si el vehículo no existe:

```http
404 Not Found
```

Response:

```json
{
  "statusCode": 404,
  "message": "Vehicle with ID 999 not found",
  "error": "Not Found"
}
```

---

## Buscar vehículos

```http
GET /api/vehicles/search?search=toyota
```

La búsqueda se realiza sobre:

* License plate
* Brand
* Model
* Color

Ejemplo:

```http
GET /api/vehicles/search?search=toy
```

Puede encontrar vehículos cuya marca sea:

```text
Toyota
```

También permite búsquedas parciales:

```http
GET /api/vehicles/search?search=cor
```

para encontrar, por ejemplo:

```text
Corolla
```

La búsqueda solamente devuelve vehículos activos.

---

## Actualizar un vehículo

```http
PATCH /api/vehicles/:id
```

Ejemplo:

```http
PATCH /api/vehicles/1
```

### Request

No es necesario enviar todos los campos:

```json
{
  "color": "Red"
}
```

También se pueden modificar varios campos:

```json
{
  "model": "Corolla Hybrid",
  "year": 2025,
  "color": "Blue"
}
```

### Response

```json
{
  "id": 1,
  "licensePlate": "AB123CD",
  "brand": "Toyota",
  "model": "Corolla Hybrid",
  "year": 2025,
  "color": "Blue",
  "type": "SEDAN",
  "active": true
}
```

---

## Desactivar un vehículo

```http
DELETE /api/vehicles/:id
```

Ejemplo:

```http
DELETE /api/vehicles/1
```

La API utiliza **eliminación lógica (soft delete)**.

El registro no se elimina físicamente de MySQL.

En cambio:

```text
active = true
```

pasa a:

```text
active = false
```

### Response

```json
{
  "id": 1,
  "licensePlate": "AB123CD",
  "brand": "Toyota",
  "model": "Corolla",
  "year": 2024,
  "color": "White",
  "type": "SEDAN",
  "active": false
}
```

---

# Estructura del proyecto

```text
src/
├── app.module.ts
├── main.ts
│
└── vehicles/
    ├── dto/
    │   ├── create-vehicle.dto.ts
    │   └── update-vehicle.dto.ts
    │
    ├── entities/
    │   └── vehicle.entity.ts
    │
    ├── enums/
    │   └── vehicle-type.enum.ts
    │
    ├── vehicles.controller.ts
    ├── vehicles.module.ts
    └── vehicles.service.ts
```

---

# Arquitectura

El proyecto sigue una estructura modular de NestJS:

```text
HTTP Request
     │
     ▼
Controller
     │
     ▼
Service
     │
     ▼
Repository
     │
     ▼
TypeORM
     │
     ▼
MySQL
```

### Controller

Se encarga de:

* Recibir las peticiones HTTP.
* Obtener parámetros.
* Recibir los DTOs.
* Definir las rutas.
* Documentar los endpoints mediante Swagger.

### Service

Contiene la lógica de negocio relacionada con los vehículos.

### DTO

Define la estructura de los datos recibidos por la API.

### Entity

Representa la tabla `vehicles` de MySQL.

### Repository

Permite interactuar con la base de datos mediante TypeORM.

---

# Vehicle

La entidad contiene:

| Campo          | Tipo    | Descripción         |
| -------------- | ------- | ------------------- |
| `id`           | number  | Identificador       |
| `licensePlate` | string  | Patente             |
| `brand`        | string  | Marca               |
| `model`        | string  | Modelo              |
| `year`         | number  | Año                 |
| `color`        | string  | Color               |
| `type`         | enum    | Tipo de vehículo    |
| `active`       | boolean | Estado del vehículo |

---

# Borrado lógico

El endpoint:

```http
DELETE /api/vehicles/:id
```

no elimina físicamente el registro.

En lugar de:

```sql
DELETE FROM vehicles WHERE id = 1;
```

se realiza conceptualmente:

```sql
UPDATE vehicles
SET active = false
WHERE id = 1;
```

Esto permite conservar la información del vehículo en la base de datos.

---

# Manejo de errores

La API utiliza las excepciones HTTP proporcionadas por NestJS.

### ID inválido

```http
GET /api/vehicles/abc
```

Response:

```http
400 Bad Request
```

### Vehículo inexistente

```http
GET /api/vehicles/999
```

Response:

```http
404 Not Found
```

---

## Desarrollo

Iniciar la aplicación en modo desarrollo:

```bash
npm run start:dev
```
