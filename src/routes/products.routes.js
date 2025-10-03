const express = require('express');
const ProductManager = require('../managers/product.manager');
const router = express.Router();
const productManager = new ProductManager();
const ProductDAO = require('../data/product.mongo');

// GET /api/products?limit=10&page=1&query=xxx&sort=asc
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const query = req.query.query || null;
    const sort = req.query.sort || null;

    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`; // baseUrl -> /api/products
    const result = await ProductDAO.listProducts({ limit, page, query, sort });

    // compute prevLink/nextLink
    const buildLink = (p) => {
      if (!p) return null;
      const qs = new URLSearchParams({ ...req.query, page: p, limit }).toString();
      return `${baseUrl}?${qs}`;
    };

    const response = {
      ...result,
      prevLink: result.hasPrevPage ? buildLink(result.prevPage) : null,
      nextLink: result.hasNextPage ? buildLink(result.nextPage) : null
    };

    res.json(response);
  } catch (error) {
    console.error('Error GET /api/products', error);
    res.status(500).json({ status: 'error', message: 'Error al obtener productos' });
  }
});

// GET /api/products/:pid
router.get('/:pid', async (req, res) => {
  try {
    const product = await ProductDAO.getById(req.params.pid);
    if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', payload: product });
  } catch (error) {
    console.error('Error GET /api/products/:pid', error);
    res.status(500).json({ status: 'error', message: 'Error interno' });
  }
});

// POST /api/products -> crear
router.post('/', async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.title || payload.price == null) {
      return res.status(400).json({ status: 'error', message: 'Faltan campos requeridos (title, price)' });
    }
    const newProduct = await ProductDAO.create(payload);
    res.status(201).json({ status: 'success', payload: newProduct });
  } catch (error) {
    console.error('Error POST /api/products', error);
    res.status(500).json({ status: 'error', message: 'No se pudo crear producto' });
  }
});

// PUT /api/products/:pid
router.put('/:pid', async (req, res) => {
  try {
    const updated = await ProductDAO.update(req.params.pid, req.body);
    if (!updated) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', payload: updated });
  } catch (error) {
    console.error('Error PUT /api/products/:pid', error);
    res.status(500).json({ status: 'error', message: 'Error al actualizar' });
  }
});

// DELETE /api/products/:pid
router.delete('/:pid', async (req, res) => {
  try {
    await ProductDAO.delete(req.params.pid);
    res.json({ status: 'success', message: 'Producto eliminado' });
  } catch (error) {
    console.error('Error DELETE /api/products/:pid', error);
    res.status(500).json({ status: 'error', message: 'Error al eliminar' });
  }
});

module.exports = router;