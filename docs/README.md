# Cafeto

Proyecto backend desarrollado en **Node.js con Express**, que simula un pequeño e-commerce de café.  
El sistema permite gestionar productos y carritos, renderizar vistas con **Handlebars**, y actualizar en tiempo real la lista de productos usando **Socket.io**.  
La persistencia principal está implementada con **MongoDB + Mongoose**.


Este proyecto es encuentra en curso.

---

## Funcionalidades principales

- **Productos**
- CRUD completo de productos.
- Listado con **paginación, filtros y ordenamiento**.
- Vistas en Handlebars para explorar productos y ver su detalle.
- Actualización en tiempo real de la lista de productos con **Socket.io**.

- **Carritos**
- CRUD completo de carritos.
- Agregar, actualizar cantidad, eliminar productos o vaciar carrito.
- Vista para visualizar un carrito con productos **poblados** desde MongoDB.

---

## Tecnologías usadas
- Node.js
- Express 
- MongoDB + Mongoose
- Handlebars 
- Socket.io

---

## Estructura del proyecto

src/
├── config/ # Configuración (MongoDB, dotenv)
├── data/ # DAOs de acceso a MongoDB
├── managers/ # Lógica de negocio
├── public/ # Archivos estáticos (CSS, JS)
├── routes/ # Rutas de la API y vistas
├── views/ # Vistas con Handlebars
└── app.js # Configuración principal del servidor

## Endpoints principales

- `/api/products` → CRUD + paginación, filtros y ordenamientos  
- `/api/carts` → CRUD completo con populate  
- `/products` → vista con paginación de productos  
- `/products/:pid` → vista de detalle de producto  
- `/carts/:cid` → vista del carrito  


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

Proyecto desarrollado por Micaela Camerini como práctica para el curso de Backend I.