# API - Cafeto

API REST para la gestión de **productos** y **carritos de compras**.  
Desarrollada en **Node.js + Express**, con persistencia en **MongoDB + Mongoose**.
---

## Productos

### ➤ Listar productos con consultas avanzadas
GET /api/products  

Query params disponibles:
- **limit** → cantidad de productos por página (default: 10)  
- **page** → página a consultar (default: 1)  
- **query** → filtrar por categoría o disponibilidad (`status=true/false`)  
- **sort** → ordenar por precio (`asc` o `desc`)  


---

### ➤ Obtener un producto por ID
GET /api/products/:pid

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

### ➤ Actualizar producto
PUT /api/products/:pid

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

---

### ➤ Agregar producto a un carrito
POST /api/carts/:cid/product/:pid

---

### ➤ Eliminar un producto de un carrito
DELETE /api/carts/:cid/products/:pid

---

### ➤ Remplazar todo el carrito 
PUT /api/carts/:cid

---

### ➤ Actualizar cantidad de producto
PUT /api/carts/:cid/products/:pid

---

### ➤ Vaciar carrito 
DELETE /api/carts/:cid

---

## Notas importantes

- IDs generados automáticamente por MongoDB.
- Persistencia en base de datos (no archivos JSON).
- Renderizado dinámico con Handlebars.
- Actualización en tiempo real mediante Socket.io en /realtimeproducts.
- Websockets (vista /realtimeproducts)
    - Evento newProduct → el servidor crea un nuevo producto en Mongo y lo emite a todos los clientes.
    - Evento deleteProduct → el servidor elimina el producto por ID y notifica a todos los clientes.