const express = require('express');
const ProductManager = require('../managers/product.manager');
// Creamos un router específico para productos
const router = express.Router();
const productManager = new ProductManager();

// GET / → listar todos los productos
router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.json(products);
});

// GET /:pid → obtener producto por ID
router.get('/:pid', async (req, res) => {
    const product = await productManager.getProductById(req.params.pid);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
});

// POST / → agregar producto
router.post('/', async (req, res) => {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json(newProduct);
});

// PUT /:pid → actualizar producto
router.put('/:pid', async (req, res) => {
    const updatedProduct = await productManager.updateProduct(req.params.pid, req.body);
    if (!updatedProduct) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(updatedProduct);
});

// DELETE /:pid → eliminar producto
router.delete('/:pid', async (req, res) => {
    await productManager.deleteProduct(req.params.pid);
    res.json({ message: 'Producto eliminado' });
});

module.exports = router;