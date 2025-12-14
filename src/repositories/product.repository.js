const ProductDAO = require('../data/product.mongo');

class ProductRepository {
  create(data) {
    return ProductDAO.create(data);
  }

  getById(id) {
    return ProductDAO.getById(id);
  }

  update(id, fields) {
    return ProductDAO.update(id, fields);
  }

  delete(id) {
    return ProductDAO.delete(id);
  }

  list(options) {
    return ProductDAO.listProducts(options);
  }
}

module.exports = new ProductRepository();