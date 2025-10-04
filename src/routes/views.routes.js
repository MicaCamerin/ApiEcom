const express = require('express');
const router = express.Router();

const ProductDAO = require('../data/product.mongo');
const CartDAO = require('../data/cart.mongo');

// Home
router.get('/', async (req, res) => {
  try {
    const result = await ProductDAO.listProducts({ limit: 10, page: 1 });
    const products = result.payload || [];
    res.render('pages/home', { layout: 'main', products });
  } catch (error) {
    console.error('GET / render error:', error);
    res.status(500).send('Error rendering home');
  }
});

// Lista completa de productos
router.get('/products', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const query = req.query.query || null;
    const sort = req.query.sort || null;

    const result = await ProductDAO.listProducts({ limit, page, query, sort });

    res.render('pages/products', {
      layout: 'main',
      ...result
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al renderizar productos');
  }
});

// Detalle de producto
router.get('/products/:pid', async (req, res) => {
  try {
    const product = await ProductDAO.getById(req.params.pid);
    if (!product) return res.status(404).send('Producto no encontrado');
    res.render('pages/productDetail', { layout: 'main', product });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al renderizar detalle');
  }
});

// Detalle del carrito
router.get('/carts/:cid', async (req, res) => {
  try {
    const cart = await CartDAO.getById(req.params.cid);
    if (!cart) return res.status(404).send('Carrito no encontrado');
    res.render('pages/cartDetail', { layout: 'main', cart });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al renderizar carrito');
  }
});

// Página de productos en tiempo real (WebSockets)
router.get('/realtimeproducts', async (req, res) => {
  try {
    const result = await ProductDAO.listProducts({ limit: 100, page: 1 });
    const products = result.payload || [];
    res.render('pages/realTimeProducts', { layout: 'main', products });
  } catch (error) {
    console.error('GET /realtimeproducts render error:', error);
    res.status(500).send('Error rendering realtime view');
  }
});

module.exports = router;

