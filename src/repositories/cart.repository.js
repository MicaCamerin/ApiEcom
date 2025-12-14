const CartDAO = require('../data/cart.mongo');

class CartRepository {
  create() {
    return CartDAO.create();
  }

  getById(cid) {
    return CartDAO.getById(cid);
  }

  addProduct(cid, pid) {
    return CartDAO.addProductToCart(cid, pid);
  }

  removeProduct(cid, pid) {
    return CartDAO.deleteProductFromCart(cid, pid);
  }

  updateProducts(cid, products) {
    return CartDAO.updateCartProducts(cid, products);
  }

  updateProductQuantity(cid, pid, quantity) {
    return CartDAO.updateProductQuantity(cid, pid, quantity);
  }

  empty(cid) {
    return CartDAO.emptyCart(cid);
  }
}

module.exports = new CartRepository();