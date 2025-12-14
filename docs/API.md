# API - Cafeto

API REST para la gestión de **usuarios**, **sesiones**, **productos**, **carritos** y **compras**.
Desarrollada en **Node.js + Express**, con persistencia en **MongoDB + Mongoose**, autenticación con **Passport + JWT**, autorización por roles y envío de correos electrónicos.
---

## Usuarios y Sesiones

### ➤ Registrar usuario
POST /api/sessions/register

---

### ➤ Login de usuario
POST /api/sessions/login

- Genera JWT
- Se envía en cookie httpOnly

---

### ➤ Usuario autenticado (DTO)
GET /api/sessions/current

- Retorna solo información no sensible del usuario.

---

### ➤ Recuperación de contraseña
POST /api/sessions/forgot-password

- Envía email con link de recuperación.
- El token expira en 1 hora.

---

### ➤ Resetear contraseña
POST /api/sessions/reset-password

- Evita reutilizar la contraseña anterior.

---

## Productos

### ➤ Listar productos
GET /api/products

Query params:
- limit
- page
- sort (asc | desc)
- query

---

### ➤ Obtener producto por ID
GET /api/products/:pid

---

### ➤ Crear producto (ADMIN)
POST /api/products

---

### ➤ Actualizar producto (ADMIN)
PUT /api/products/:pid

---

### ➤ Eliminar producto (ADMIN)
DELETE /api/products/:pid

---

## Carritos

### ➤ Crear carrito
POST /api/carts

---

### ➤ Ver carrito
GET /api/carts/:cid

---

### ➤ Agregar producto al carrito (USER)
POST /api/carts/:cid/products/:pid

---

### ➤ Eliminar producto del carrito
DELETE /api/carts/:cid/products/:pid

---

### ➤ Vaciar carrito
DELETE /api/carts/:cid

---

## Compras

### ➤ Finalizar compra
POST /api/carts/:cid/purchase

- Verifica stock.
- Genera ticket.
- Descuenta stock.
- Maneja compras completas o parciales.

---

## Notas importantes

- Autenticación con JWT en cookie httpOnly.
- Autorización por roles (`user`, `admin`).
- DTO para evitar exponer datos sensibles.
- Contraseñas hasheadas con bcrypt.
- Mailing con Nodemailer.
- Arquitectura basada en DAO + Repository.
- WebSockets para actualización en tiempo real.