const cartRepository = require('../repositories/cart.repository');

class CartService {
  createCart() {
    return cartRepository.create();
  }

  getCart(cid) {
    return cartRepository.getById(cid);
  }

  addToCart(cid, pid) {
    return cartRepository.addProduct(cid, pid);
  }

  removeFromCart(cid, pid) {
    return cartRepository.removeProduct(cid, pid);
  }

  updateCart(cid, products) {
    return cartRepository.updateProducts(cid, products);
  }

  updateQuantity(cid, pid, quantity) {
    return cartRepository.updateProductQuantity(cid, pid, quantity);
  }

  emptyCart(cid) {
    return cartRepository.empty(cid);
  }
}

module.exports = new CartService();