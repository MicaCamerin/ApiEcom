# Cafeto

Proyecto backend desarrollado en **Node.js con Express**, que simula un pequeño e-commerce de café.  
El sistema permite gestionar productos y carritos, renderizar vistas con **Handlebars**, y actualizar en tiempo real la lista de productos usando **Socket.io**.  
La persistencia principal está implementada con **MongoDB + Mongoose**.

---

## Funcionalidades principales

- **Productos**
- Ver lista paginada de productos.
- Consultar detalle individual.
- Crear, actualizar y eliminar productos.
- Filtrar y ordenar mediante query params (`limit`, `page`, `sort`, `query`).
- Actualización en tiempo real vía WebSockets.

- **Carritos**
- Crear carritos vacíos.
- Agregar, eliminar y modificar productos dentro de un carrito.
- Vaciar carrito completo.

### Websockets
- La vista `/realtimeproducts` permite ver y modificar la lista de productos sin recargar la página.

---

## Tecnologías usadas
- Node.js  
- Express  
- MongoDB + Mongoose  
- Handlebars  
- Socket.io  
- Dotenv 

---

## Estructura del proyecto

src/
├── config/          # Configuración general y conexión a MongoDB
├── data/            # DAOs con persistencia en Mongo
├── public/          # Archivos estáticos (CSS, JS)
├── routes/          # Rutas API y vistas
├── views/           # Plantillas Handlebars
└── app.js           # Configuración principal del servidor

## Endpoints principales

- /api/products → CRUD completo de productos con paginación, filtros (query) y ordenamientos (sort).
- /api/carts → CRUD completo de carritos, con uso de populate para mostrar los productos asociados.
- / → vista principal (home) con listado de productos.
- /products → vista con paginación y filtros de productos.
- /products/:pid → vista de detalle de producto individual
- /carts/:cid → vista del carrito del usuario.
- /realtimeproducts → vista en tiempo real con WebSockets para crear y eliminar productos dinámicamente.

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