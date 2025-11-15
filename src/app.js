
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');
const connectDB = require('./config/index'); 
const ProductDAO = require('./data/product.mongo');

const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users.routes');

const passport = require('passport');
const initializePassport = require('./config/passport');
const sessionsRouter = require('./routes/sessions.routes');

initializePassport();
app.use(passport.initialize());

app.use(cookieParser());
app.use('/api/users', usersRouter);
app.use('/api/sessions', sessionsRouter);

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
  console.log('Nuevo cliente conectado', socket.id);

  // Cliente emite 'newProduct' -> guarda en DB y reemite con el id real
  socket.on('newProduct', async (product) => {
    try {
      const saved = await ProductDAO.create(product);
      io.emit('updateProducts', saved);
    } catch (err) {
      console.error('WS newProduct error:', err);
      socket.emit('error', { message: 'No se pudo crear el producto' });
    }
  });

  // Cliente emite 'deleteProduct' -> borra en DB y reemite id eliminado
  socket.on('deleteProduct', async (id) => {
    try {
      await ProductDAO.delete(id);
      io.emit('removeProduct', id);
    } catch (err) {
      console.error('WS deleteProduct error:', err);
      socket.emit('error', { message: 'No se pudo eliminar el producto' });
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});