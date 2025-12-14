const express = require('express');
const router = express.Router();
const cartService = require('../services/cart.service');
const passport = require('passport');
const authorizeRole = require('../middlewares/authorization.middleware');



router.post('/:cid/product/:pid',
  passport.authenticate('jwt', { session: false }),
  authorizeRole(['user']), async (req, res) => {
  try {
    const cart = await cartService.createCart();
    res.status(201).json({ status: 'success', payload: cart });
  } catch (error) {
    console.error('POST /api/carts', error);
    res.status(500).json({ status: 'error', message: 'Error creando carrito' });
  }
});

// GET /api/carts/:cid -> con populate
router.get('/:cid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartService.getCart(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    res.json({ status: 'success', payload: cart });
  } catch (error) {
    console.error('GET /api/carts/:cid', error);
    res.status(500).json({ status: 'error', message: 'Error al obtener carrito' });
  }
});

// POST /api/carts/:cid/product/:pid -> agregar 
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartService.addToCart(cid, pid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    res.json({ status: 'success', payload: cart });
  } catch (error) {
    console.error('POST add product', error);
    res.status(500).json({ status: 'error', message: 'Error agregando producto' });
  }
});

// DELETE /api/carts/:cid/products/:pid -> quitar producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartService.removeFromCart(cid, pid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    res.json({ status: 'success', payload: cart });
  } catch (error) {
    console.error('DELETE product from cart', error);
    res.status(500).json({ status: 'error', message: 'Error eliminando producto del carrito' });
  }
});

// PUT /api/carts/:cid -> reemplazar productos del carrito (body: { products: [{product: id, quantity}] })
router.put('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const productsArray = req.body.products || [];
    const cart = await cartService.updateCart(cid, productsArray);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    res.json({ status: 'success', payload: cart });
  } catch (error) {
    console.error('PUT replace cart', error);
    res.status(500).json({ status: 'error', message: 'Error actualizando carrito' });
  }
});

// PUT /api/carts/:cid/products/:pid -> actualizar solo cantidad (body: { quantity: N })
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    if (quantity == null) return res.status(400).json({ status: 'error', message: 'Falta quantity' });
    const cart = await cartService.updateQuantity(cid, pid, Number(quantity));
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito o producto no encontrado' });
    res.json({ status: 'success', payload: cart });
  } catch (error) {
    console.error('PUT update qty', error);
    res.status(500).json({ status: 'error', message: 'Error actualizando cantidad' });
  }
});

// DELETE /api/carts/:cid -> vaciar carrito
router.delete('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartService.emptyCart(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    res.json({ status: 'success', payload: cart });
  } catch (error) {
    console.error('DELETE empty cart', error);
    res.status(500).json({ status: 'error', message: 'Error vaciando carrito' });
  }
});

module.exports = router;