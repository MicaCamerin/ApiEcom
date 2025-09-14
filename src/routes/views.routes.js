const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/product.manager');

const productManager = new ProductManager();

// Home: lista estática
router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', { products });
});

// Real-time: lista dinámica
router.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('realTimeProducts', { products });
});

module.exports = router;