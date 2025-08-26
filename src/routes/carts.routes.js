const express = require('express');
const CartManager = require('../managers/cart.manager');

const router = express.Router();
const cartManager = new CartManager();

// POST / → crear carrito
router.post('/', async (req, res) => {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
});

// GET /:cid → listar productos de un carrito
router.get('/:cid', async (req, res) => {
    const cart = await cartManager.getCartById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart.products);
});

// POST /:cid/product/:pid → agregar producto a un carrito
router.post('/:cid/product/:pid', async (req, res) => {
    const cart = await cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
});

module.exports = router;