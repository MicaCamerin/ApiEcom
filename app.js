
const express = require('express');
const app = express();
const PORT = 8080;

// Middleware para leer JSON en requests
app.use(express.json());

// Importamos las rutas
const productsRouter = require('./src/routes/products.routes');
const cartsRouter = require('./src/routes/carts.routes');

// Usamos los routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Ruta raíz para probar rápido
app.get('/', (req, res) => {
    res.send('Servidor funcionando - Backend Entrega I');
});

// Servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});