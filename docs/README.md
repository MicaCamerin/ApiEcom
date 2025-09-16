# Cafeto

Proyecto backend desarrollado en **Node.js con Express**, que simula un pequeño e-commerce de café.  
El sistema permite gestionar productos y carritos, renderizar vistas con **Handlebars**, y actualizar en tiempo real la lista de productos usando **Socket.io**.

Este proyecto es encuentra en curso.

---

## Funcionalidades principales

- **Productos**
  - Ver lista de productos.
  - Crear productos mediante formulario (en tiempo real).
  - Eliminar productos mediante formulario (en tiempo real).
  - Persistencia en archivos `JSON`.

- **Carritos**
  - Crear carritos vacíos.
  - Consultar el contenido de un carrito.
  - Agregar productos a un carrito.

---

## Tecnologías usadas
- Node.js
- Express 
- Handlebars 
- Socket.io

---

## Estructura del proyecto

src/
├── data/ # Archivos JSON de productos y carritos
├── managers/ # Lógica de acceso a datos (productos/carritos)
├── public/ # Archivos estáticos (CSS, JS)
├── routes/ # Rutas de la API y vistas
└── views/ # Vistas con Handlebars
app.js # Configuración principal del servidor

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