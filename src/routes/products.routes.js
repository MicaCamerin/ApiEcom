const express = require('express');
const router = express.Router();
const ProductDAO = require('../data/product.mongo');


module.exports = (io) => {
  const router = express.Router();

  // GET list 
  router.get('/', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const page = parseInt(req.query.page) || 1;
      const query = req.query.query || null;
      const sort = req.query.sort || null;

      const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
      const result = await ProductDAO.listProducts({ limit, page, query, sort });

      const buildLink = (p) => {
        if (!p) return null;
        const qs = new URLSearchParams({ ...req.query, page: p, limit }).toString();
        return `${baseUrl}?${qs}`;
      };

      res.json({
        ...result,
        prevLink: result.hasPrevPage ? buildLink(result.prevPage) : null,
        nextLink: result.hasNextPage ? buildLink(result.nextPage) : null
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Error al listar productos' });
    }
  });

  // POST 
  router.post('/', async (req, res) => {
    try {
      const newProd = await ProductDAO.create(req.body);
      io.emit('updateProducts', newProd);
      res.status(201).json({ status: 'success', payload: newProd });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Error creando producto' });
    }
  });

  // DELETE 
  router.delete('/:pid', async (req, res) => {
    try {
      await ProductDAO.delete(req.params.pid);
      io.emit('removeProduct', req.params.pid);
      res.json({ status: 'success', message: 'Producto eliminado' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Error eliminando producto' });
    }
  });

  // GET por id
  router.get('/:pid', async (req, res) => {
    try {
      const product = await ProductDAO.getById(req.params.pid);
      if (!product) return res.status(404).json({ status: 'error', message: 'No encontrado' });
      res.json({ status: 'success', payload: product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Error interno' });
    }
  });

  // PUT
  router.put('/:pid', async (req, res) => {
    try {
      const updated = await ProductDAO.update(req.params.pid, req.body);
      if (!updated) return res.status(404).json({ status: 'error', message: 'No encontrado' });
      io.emit('updateProducts', updated); // emitir para refrescar
      res.json({ status: 'success', payload: updated });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Error actualizando' });
    }
  });

  return router;
};