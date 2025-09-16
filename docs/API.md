# API - Cafeto

API REST para la gestión de **productos** y **carritos de compras**.  
Desarrollada en **Node.js + Express**, con persistencia en archivos `.json`.

---

## Productos

### ➤ Obtener todos los productos
GET /api/products  
> (Solo usado internamente por las vistas, opcional documentar si se usa en Postman)

---

### ➤ Crear un producto
POST /api/products  

Body (JSON):
```json
{
  "title": "Café Colombiano",
  "price": 1200
}
```

---

### ➤ Eliminar un producto
DELETE /api/products/:pid

Parámetro de ruta:
- pid → ID del producto a eliminar.

Respuesta exitosa (200):
```json
{
  "status": "success",
  "message": "Producto eliminado"
}
```

---

## Carritos

### ➤ Crear un carrito
POST /api/carts

---

### ➤ Ver productos de un carrito
GET /api/carts/:cid

Parámetro de ruta:
- cid → ID del carrito.

---

### ➤ Agregar producto a un carrito
POST /api/carts/:cid/product/:pid

Parámetros de ruta:
- cid → ID del carrito.  
- pid → ID del producto.  

---

## Notas importantes

- Los IDs se generan automáticamente en base al último elemento del archivo `.json`.
- Los productos se pueden gestionar tanto por la API como por las vistas (`/realtimeproducts`).
- Los carritos solo se gestionan desde la API (Postman, Insomnia, etc.).
- No hay base de datos, toda la información se guarda en archivos JSON dentro de la carpeta `/src/data`.