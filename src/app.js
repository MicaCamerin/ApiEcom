
const express = require('express');
const app = express();
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');
const connectDB = require('./config/index'); 
require('dotenv').config();

const PORT = process.env.PORT || 8080;

// MongoDB
connectDB();

// Servidor HTTP y WebSocket
const httpServer = createServer(app);
const io = new Server(httpServer);


// Configuración de Handlebars
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const productsRouter = require('./routes/products.routes')(io);
const cartsRouter = require('./routes/carts.routes');
const viewsRouter = require('./routes/views.routes');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// WebSocket
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('newProduct', (product) => {
    io.emit('updateProducts', product);
  });

  socket.on('deleteProduct', (id) => {
    io.emit('removeProduct', id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});