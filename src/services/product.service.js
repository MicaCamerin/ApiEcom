const productRepository = require('../repositories/product.repository');

class ProductService {
  getProducts(options) {
    return productRepository.list(options);
  }

  getProductById(id) {
    return productRepository.getById(id);
  }

  createProduct(data) {
    return productRepository.create(data);
  }

  updateProduct(id, fields) {
    return productRepository.update(id, fields);
  }

  deleteProduct(id) {
    return productRepository.delete(id);
  }
}

module.exports = new ProductService();