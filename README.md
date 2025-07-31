# Club Manager API

Este proyecto es una **API RESTful** desarrollada en [NestJS](https://nestjs.com/) para la gestión de un club de voleibol.  
Permite administrar jugadores, usuarios y autenticación, manejando roles y estados de pago.

---

## 🚀 Características principales

- Gestión de **jugadores** con validaciones de RUT chileno y estados del club.
- Sistema de **usuarios** asociados a jugadores, con autenticación JWT.
- Roles (`ADMIN`, `DELEGATE`, `PLAYER`) para control de permisos.
- Estados de pago de mensualidad y estado de membresía en el club.
- Arquitectura modular y escalable.

---

## 📂 Estructura del proyecto

```plaintext
src/
│
├── auth/                   # Módulo de autenticación
│   ├── controllers/        # Controladores de auth
│   ├── dtos/               # DTOs para login/registro
│   ├── guards/             # Guards (JWT, roles)
│   ├── models/             # Modelos (ej. token payload)
│   ├── services/           # Lógica de negocio para auth
│   ├── strategies/         # Estrategias Passport (local, JWT)
│   └── auth.module.ts
│
├── common/                 # Código compartido
│   ├── config/             # Configuración global
│   ├── decorators/         # Decoradores personalizados
│   ├── enums/              # Enumeraciones globales
│   ├── exceptions/         # Excepciones personalizadas
│   ├── filters/            # Filtros de excepciones
│   ├── interceptors/       # Interceptores globales
│   └── pipes/              # Pipes de validación
│
├── database/               # Conexión a base de datos
│   └── database.module.ts
│
├── players/                # Módulo de jugadores
│   ├── controllers/        # Controladores de players
│   ├── dtos/               # DTOs para crear/editar players
│   ├── entities/           # Esquemas/entidades Mongoose
│   ├── enums/              # Enumeraciones de player
│   ├── services/           # Lógica de negocio de players
│   └── players.module.ts
│
├── users/                  # Módulo de usuarios
│   ├── controllers/        # Controladores de users
│   ├── dtos/               # DTOs para users
│   ├── entities/           # Esquemas/entidades Mongoose
│   ├── services/           # Lógica de negocio de users
│   └── user.module.ts
│
└── app.module.ts           # Módulo raíz de NestJS
```

---

## 🔑 Endpoints principales

### Autenticación (`/auth`)
- `POST /auth/login` → Inicia sesión y devuelve un JWT.

### Jugadores (`/players`)
- `GET /players` → Lista todos los jugadores.
- `GET /players/:id` → Obtiene detalles de un jugador.
- `POST /players` → Crea un nuevo jugador.
- `PATCH /players/:id` → Actualiza datos de un jugador.
- `DELETE /players/:id` → Elimina un jugador.
- `POST /players/:id/user` → Crea un usuario basado en un jugador.
- `PATCH /players/:id/register-payment` → Registra pago de mensualidad.

### Usuarios (`/users`)
- `POST /users/register` → Crea un nuevo usuario.
- `PUT /users/:email/password` → Actualiza la contraseña de un usuario.
- `GET /users` → Lista todos los usuarios.
- `GET /users/:id` → Obtiene un usuario por ID.
- `DELETE /users/:id` → Elimina un usuario.

---

## ⚙️ Instalación y ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/crisortegamunoz/club-manager.git
cd club-manager
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Copia el archivo `.env-example` y renómbralo como `.env`.  
Asegúrate de completar:
```env
API_KEY=YOUR_API_KEY
JWT_SECRET=YOR_JWT_SECRET

MONGO_INITDB_ROOT_USERNAME=YOUR_MONGO_INITDB_ROOT_USERNAME
MONGO_INITDB_ROOT_PASSWORD=YOUR_MONGO_INITDB_ROOT_PASSWORD
MONGO_DB=YOUR_MONGO_DB
MONGO_HOST=YOUR_MONGO_HOST
MONGO_PORT=YOUR_MONGO_PORT
MONGO_CONNECTION=YOUR_MONGO_CONNECTION
```

### 4. Ejecutar la aplicación
```bash
npm run start:dev
```

---

## 🧪 Pruebas
```bash
npm run test
```

---

## 📌 Notas adicionales

- La API usa **JWT** para autenticación, por lo que debes enviar el token en el header:
  ```
  Authorization: Bearer <token>
  ```
- Las contraseñas se almacenan **hasheadas con bcrypt**.
- La validación de RUT chileno se hace con regex y validaciones personalizadas.

---

## 📜 Licencia
MIT
