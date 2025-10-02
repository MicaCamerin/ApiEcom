const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/product.manager');

const productManager = new ProductManager();

// Home: lista estática
router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('pages/home', { layout: 'main', products });
});

// Real-time: lista dinámica
router.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('pages/realTimeProducts', { layout: 'main', products });
});

module.exports = router;