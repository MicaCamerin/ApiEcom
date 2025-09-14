const express = require('express');
const ProductManager = require('../managers/product.manager');
const router = express.Router();
const productManager = new ProductManager();

// Io
module.exports = (io) => {
  // Crear producto
  router.post('/', async (req, res) => {
    try {
      const newProduct = await productManager.addProduct(req.body);
      io.emit('updateProducts', newProduct); 
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error al crear producto:', error);
      res.status(500).json({ error: 'Error al crear producto' });
    }
  });

  // Eliminar producto
  router.delete('/:pid', async (req, res) => {
    try {
      await productManager.deleteProduct(req.params.pid);
      io.emit('removeProduct', req.params.pid); 
      res.json({ message: 'Producto eliminado' });
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      res.status(500).json({ error: 'Error al eliminar producto' });
    }
  });

  return router;
};