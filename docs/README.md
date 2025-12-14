# Cafeto

Proyecto backend desarrollado en **Node.js con Express**, que simula un pequeño e-commerce de café.  
Incluye **autenticación de usuarios con JWT**, manejo de **roles**, lógica de compra con **tickets**, recuperación de contraseña por correo electrónico y una arquitectura basada en **DAO, Repository y DTO**.
La persistencia está implementada con **MongoDB + Mongoose**, renderizado de vistas con **Handlebars** y actualización en tiempo real mediante **Socket.io**.

⚠️ El archivo `.env` no se incluye en el repositorio por seguridad.  
Se provee `.env.example` con las variables necesarias para la configuración.⚠️
---

## Funcionalidades principales

### Usuarios y Autenticación
- Registro de usuarios con contraseña hasheada (**bcrypt**).
- Login de usuarios con **JWT**.
- Envío del token mediante **cookie httpOnly**.
- Estrategia `current` para validar usuarios autenticados.
- Ruta `/api/sessions/current` que retorna un **DTO de usuario**, evitando exponer información sensible.
- Sistema de **roles** (`user` y `admin`).
- Recuperación de contraseña por email con:
  - Token temporal con vencimiento (1 hora).
  - Prevención de reutilización de la contraseña anterior.

### Productos
- Listado de productos con paginación.
- Filtros y ordenamientos mediante query params (`limit`, `page`, `sort`, `query`).
- Consultar detalle de producto.
- Crear, actualizar y eliminar productos.
- **Autorización por rol**:
  - Solo usuarios `admin` pueden crear, modificar o eliminar productos.
- Actualización en tiempo real mediante **WebSockets**.
- Actualización en tiempo real vía WebSockets.

### Carritos y Compras
- Creación de carritos asociados a usuarios.
- Agregar, eliminar y modificar productos del carrito.
- Vaciar carrito completo.
- **Proceso de compra**:
  - Verificación de stock.
  - Generación de **Ticket de compra**.
  - Manejo de compras completas e incompletas.
  - Descuento automático de stock en productos comprados.
- Solo usuarios con rol `user` pueden realizar compras.

### 🔌 WebSockets
- La vista `/realtimeproducts` permite crear y eliminar productos sin recargar la página.
- Eventos:
  - `newProduct`
  - `deleteProduct`

---

## Arquitectura del servidor

- **DAO** para acceso a datos.
- **Repository** como capa intermedia para la lógica de negocio.
- **DTO** para transferencia segura de información sensible.
- **Middlewares** de autenticación y autorización reutilizables.
- Uso de **variables de entorno** para credenciales y configuración sensible.
- Integración de **mailing** para recuperación de contraseñas.

---

## Tecnologías usadas
- Node.js
- Express
- MongoDB + Mongoose
- Passport (local + JWT)
- JSON Web Tokens
- Bcrypt
- Cookie Parser
- Nodemailer
- Handlebars
- Socket.io
- Dotenv 

---

## Estructura del proyecto

src/
├── config/          # Configuración general y conexión a MongoDB
├── data/            # DAOs con persistencia en Mongo
├── repositories/    # Repositories (lógica de negocio)
├── dto/             # Data Transfer Objects
├── public/          # Archivos estáticos (CSS, JS)
├── routes/          # Rutas API y vistas
├── views/           # Plantillas Handlebars
└── app.js           # Configuración principal del servidor

## Endpoints principales

## Endpoints principales

- `/api/sessions/register`
- `/api/sessions/login`
- `/api/sessions/current`
- `/api/sessions/forgot-password`
- `/api/sessions/reset-password`

- `/api/products`
- `/api/carts`
- `/api/carts/:cid/purchase`

## Cómo ejecutar el proyecto

1. Clonar el repositorio.  
2. Instalar dependencias:  
   ```bash
   npm install
3. Levantar el servidor:
   node app.js
4. Abrir el navegador:
   http://localhost:8080/ → lista de productos.
   http://localhost:8080/realtimeproducts → productos en tiempo real.

## Autor

Proyecto desarrollado por Micaela Camerini como práctica para el curso de Backend I y II.